import React from "react";
import Header from "./Header";
import Content from "./Content";

export default function Course(props) {
  return (
    <>
      <Header course={props.course}></Header>
      <Content course={props.course}></Content>
    </>
  );
}
