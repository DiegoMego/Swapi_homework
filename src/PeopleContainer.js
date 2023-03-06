import React, { useState } from "react";
import axios from "axios";

function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function PeopleContainer({ people, setPeople, setPerson }) {
  const [searchText, setSearchText] = useState('');
  const [personUrl, setPersonUrl] = useState('');
  async function getPeople(text) {
    const response = await axios.get('https://swapi.dev/api/people', {
      params: {
        search: text,
      },
    });
    setPeople(response.data.results);
  };
  const onClick = async () => {
    await getPeople(searchText);
  };
  const onKeyDown = async (e) => {
    if (e.key === 'Enter') await getPeople(searchText);
  };

  const viewPersonInfo = async () => {
    if (personUrl) {
      const response = await axios.get(personUrl);
      setPerson(response.data);
    }
  }
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
        <button className="search-button" type="button" onClick={onClick}>Search</button>
      </div>
      <div className="people-found">
        {people.map(({ name, birth_year, gender, height, url }) => (
          <div className="person" onClick={() => setPersonUrl(url)}>
            <p className="person-info-row">
              <span>{name}</span>
              <span className="button-like-text">{birth_year}</span>
            </p>
            <p className="person-info-row">
              <span>{gender !== 'n/a' ? capitalizeFirstLetter(gender) : gender}</span>
              <span>{height}</span>
            </p>
          </div>
        ))}
        {people.length === 0 && <div className="no-people-text">There are no people</div>}
      </div>
      <div className="view-container">
        <button className="view-button" onClick={async () => await viewPersonInfo()}>View</button>
      </div>
    </div>
  );
}

export default PeopleContainer;
