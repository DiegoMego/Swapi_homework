import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import useFetch from "./useFetch";

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function PeopleContainer({ setPerson, setPersonLoading }) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedPersonUrl, setSelectedPersonUrl] = useState("");
  const [page, setPage] = useState(1);
  const { loading, items, hasMore } = useFetch(
    "https://swapi.dev/api/people",
    searchText,
    page,
    firstLoad
  );
  const observer = useRef();
  const lastItemElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const onClick = async () => {
    setFirstLoad(false);
    setPage(1);
    setSearchText(inputText);
  };

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      setFirstLoad(false);
      setPage(1);
      setSearchText(inputText);
    }
  };

  const viewPersonInfo = async () => {
    if (selectedPersonUrl) {
      setPersonLoading(true);
      const response = await axios.get(selectedPersonUrl);
      setPerson(response.data);
      setPersonLoading(false);
    }
  };

  return (
    <div className="people-container">
      <div className="search-box-container">
        <input
          className="search-box"
          type="search"
          placeholder="Search People"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="search-button" type="button" onClick={onClick}>
          Search
        </button>
      </div>
      <div className="people-found">
        {!firstLoad && items.map(({ name, birth_year, gender, height, url }, idx) => {
          if (items.length === idx + 1) return (
            <div
              className={`${
                selectedPersonUrl === url ? "person person-selected" : "person"
              }`}
              onClick={() => setSelectedPersonUrl(url)}
              ref={lastItemElementRef}
            >
              <p className="person-info-row">
                <span>{name}</span>
                <span className="button-like-text">{birth_year}</span>
              </p>
              <p className="person-info-row">
                <span>
                  {gender !== "n/a" ? capitalizeFirstLetter(gender) : gender}
                </span>
                <span>{height}</span>
              </p>
            </div>
          )
          return (
            <div
              className={`${
                selectedPersonUrl === url ? "person person-selected" : "person"
              }`}
              onClick={() => setSelectedPersonUrl(url)}
            >
              <p className="person-info-row">
                <span>{name}</span>
                <span className="button-like-text">{birth_year}</span>
              </p>
              <p className="person-info-row">
                <span>
                  {gender !== "n/a" ? capitalizeFirstLetter(gender) : gender}
                </span>
                <span>{height}</span>
              </p>
            </div>
          );
        })}
        {loading && (
          <Oval
            height={80}
            width={80}
            color="#3070ed"
            wrapperStyle={{}}
            wrapperClass="no-people-text"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#97f9ff"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        )}
        {(firstLoad || !loading && items.length === 0) && (
          <div className="no-people-text">There are not people</div>
        )}
      </div>
      <div className="view-container">
        <button
          className="view-button"
          onClick={async () => await viewPersonInfo()}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default PeopleContainer;
