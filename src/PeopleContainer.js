import React, { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function PeopleContainer({ people, setPeople, setPerson, setPersonLoading }) {
  const [searchText, setSearchText] = useState("");
  const [selectedPersonUrl, setSelectedPersonUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function getPeople(text) {
    setIsLoading(true);
    const response = await axios.get("https://swapi.dev/api/people", {
      params: {
        search: text,
      },
    });
    setPeople(response.data.results);
    setIsLoading(false);
  }
  const onClick = async () => {
    await getPeople(searchText);
  };
  const onKeyDown = async (e) => {
    if (e.key === "Enter") await getPeople(searchText);
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="search-button" type="button" onClick={onClick}>
          Search
        </button>
      </div>
      <div className="people-found">
        {isLoading && (
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
        {!isLoading &&
          people.map(({ name, birth_year, gender, height, url }) => {
            return (
              <div
                className={`${
                  selectedPersonUrl === url
                    ? "person person-selected"
                    : "person"
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
        {!isLoading && people.length === 0 && (
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
