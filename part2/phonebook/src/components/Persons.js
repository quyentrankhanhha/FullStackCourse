import React from "react";

export default function Persons(props) {
  return (
    <>
      {props.persons.map((person) => (
        <div key={person.number}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={props.remove} value={person.name} id={person.id}>
            delete
          </button>
        </div>
      ))}
    </>
  );
}
