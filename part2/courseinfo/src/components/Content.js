import React from "react";
import Part from "./Part";

export default function Content(props) {
  const total = props.course.parts
    .map((item) => item.exercises)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <>
      {props.course.parts.map((item) => (
        <Part key={item.id} name={item.name} exercises={item.exercises}></Part>
      ))}
      <h3>total {total} of exercises</h3>
    </>
  );
}
