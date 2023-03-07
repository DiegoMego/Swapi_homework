import React, { useState } from "react";
import "./App.css";
import 'react-loading-skeleton/dist/skeleton.css';

import PeopleContainer from "./PeopleContainer";
import PersonContainer from "./PersonContainer";

function App() {
  const [person, setPerson] = useState(null);
  const [personLoading, setPersonLoading] = useState(false);

  return (
    <div className="app">
      <PeopleContainer setPerson={setPerson} setPersonLoading={setPersonLoading} />
      <PersonContainer person={person} personLoading={personLoading} />
    </div>
  );
}

export default App;
