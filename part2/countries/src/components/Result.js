import React from "react";
import Button from "./Button";
import Country from "./Country";
import Capital from "./Capital";

export default function Result(props) {
  return (
    <>
      {props.filtered.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {props.filtered.length === 1 &&
        props.filtered.map((country) => (
          <div key={country.name}>
            <Country country={country}></Country>
            <Capital country={country}></Capital>
          </div>
        ))}

      {props.filtered.length > 1 &&
        props.filtered.length < 10 &&
        props.filtered.map((country) => (
          <div key={country.name}>
            {country.name}
            <Button country={country}></Button>
          </div>
        ))}
    </>
  );
}
