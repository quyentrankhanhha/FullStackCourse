import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Capital(props) {
  const [capital, setCapital] = useState([]);
  console.log(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.country.capital}`
      )
      .then((res) => {
        setCapital(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.country.capital]);
  console.log(capital);
  return (
    <>
      <h2>Weather in {props.country.capital}</h2>

      <p>
        <strong> temperature: </strong>
        {capital.current.temperature} Celcius
      </p>
      <img src={capital.current.weather_icons} alt="icon" />
      <p>
        <strong>wind: </strong>
        {capital.current.wind_speed} mph direction {capital.current.wind_dir}
      </p>
    </>
  );
}
