import React from "react";

export default function Result(props) {
  return (
    <div>
      {props.filtered.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
}
