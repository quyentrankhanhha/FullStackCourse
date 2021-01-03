import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([1, 4, 6, 3]);
  let copy = [...points];
  const maxNumber = Math.max(...points);
  const max = points.findIndex((a) => a === maxNumber);

  const random = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };
  const vote = () => {
    if (points[selected] === undefined && selected > points.length - 1) {
      var ary = new Array(selected - points.length + 1).fill(0);
      copy = points.concat(ary);
      copy[selected]++;
      setPoints(copy);
    } else {
      copy[selected]++;
      setPoints(copy);
    }
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>has {copy[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={random}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[max]}</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
