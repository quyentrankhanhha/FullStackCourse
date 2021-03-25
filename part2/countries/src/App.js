import React, { useState, useEffect } from "react";
import axios from "axios";
import Result from "./components/Result";
import Search from "./components/Search";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchOnChange = (event) => {
    setSearch(event.target.value);
  };

  const filtered = countries.filter((country) => {
    return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <>
      <Search search={search} searchOnChange={searchOnChange}></Search>
      {filtered.length === countries.length ? (
        <></>
      ) : (
        <Result filtered={filtered}></Result>
      )}
    </>
  );
}
