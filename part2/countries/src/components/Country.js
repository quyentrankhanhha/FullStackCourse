import React from "react";

export default function Country(props) {
  return (
    <div key={props.country.name}>
      <h2>{props.country.name}</h2>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {props.country.languages.map((lan) => (
          <li key={lan.iso639_1}>{lan.name}</li>
        ))}
      </ul>
      <img src={props.country.flag} alt="flag" width={200} />
    </div>
  );
}
