import React, { useState } from "react";
import "./App.css";
import PeopleContainer from "./PeopleContainer";
import PersonContainer from "./PersonContainer";

function App() {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);

  return (
    <div className="app">
      <PeopleContainer people={people} setPeople={setPeople} setPerson={setPerson} />
      <PersonContainer person={person}/>
    </div>
  );
}

export default App;
