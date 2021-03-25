import React from "react";

export default function Search(props) {
  return (
    <div>
      find countries
      <input
        value={props.search}
        onChange={props.searchOnChange}
        placeholder="Search"
      />
    </div>
  );
}
