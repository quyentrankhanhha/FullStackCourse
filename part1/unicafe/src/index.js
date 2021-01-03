import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
const Statistic = (props) => {
  return (
    <tr>
      <td> {props.text} </td>
      <td>
        {props.value} {props.text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};
const Statictics = (props) => {
  return (
    <table>
      <tbody>
        <Statistic text="good" value={props.good}></Statistic>
        <Statistic text="neutral" value={props.neutral}></Statistic>
        <Statistic text="bad" value={props.bad}></Statistic>
        <Statistic text="all" value={props.total}></Statistic>
        <Statistic text="average" value={props.average}></Statistic>
        <Statistic text="positive" value={props.positive}></Statistic>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const vote = (value, setValue) => {
    setValue(value + 1);
  };
  let total = good + neutral + bad;
  let average = ((good * 1 + neutral * 0 - 1 * bad) / total).toFixed(1);
  let positive = (good / total).toFixed(1);
  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => vote(good, setGood)} text="good"></Button>
      <Button
        handleClick={() => vote(neutral, setNeutral)}
        text="neutral"
      ></Button>
      <Button handleClick={() => vote(bad, setBad)} text="bad"></Button>
      <h2>statics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statictics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        ></Statictics>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
