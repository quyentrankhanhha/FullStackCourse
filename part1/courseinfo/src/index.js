import React from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((e) => (
        <Part part={e.name} exercises={e.exercises}></Part>
      ))}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  let sum = 0;
  const m = props.parts.map((e) => e.exercises);
  m.forEach((entry) => (sum += entry));
  return (
    <p>
      Number of exercises
      {sum}
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
