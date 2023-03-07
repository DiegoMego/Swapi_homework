import React from "react";
import Skeleton from 'react-loading-skeleton';

function PersonDetailRow({ label, value }) {
  return (
    <div className="person-details-row">
      <p className="person-details-label">{label}:</p>
      <p className="person-details-value">{value}</p>
    </div>
  );
}

function PersonDetails({ person }) {
  const { name, height, mass, skin_color, birth_year, hair_color, eye_color } =
    person;
  return (
    <>
      <PersonDetailRow label="Name" value={name} />
      <PersonDetailRow label="Height" value={height} />
      <PersonDetailRow label="Mass" value={mass} />
      <PersonDetailRow label="Skin color" value={skin_color} />
      <PersonDetailRow label="Birth year" value={birth_year} />
      <PersonDetailRow label="Hair color" value={hair_color} />
      <PersonDetailRow label="Eye color" value={eye_color} />
    </>
  );
}

function PersonContainer({ person, personLoading }) {
  return (
    <div className="person-container">
      <p className="person-container-header">Show information:</p>
      <div className="person-details">
        {personLoading && <Skeleton count={7} className="custom-skeleton" />}
        {!personLoading && person && (
          <PersonDetails person={person} />
        )}
      </div>
    </div>
  );
}

export default PersonContainer;
