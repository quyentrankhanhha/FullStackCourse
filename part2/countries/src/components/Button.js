import React, { useState } from "react";
import Country from "./Country";

export default function Button(props) {
  const [show, setShow] = useState(false);
  const showOnClick = () => {
    setShow(!show);
  };
  return (
    <>
      <button onClick={showOnClick}>show</button>
      {show && <Country country={props.country}></Country>}
    </>
  );
}
