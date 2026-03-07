import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positivePercentage = (good / total) * 100;

  return (
    <div>
      <div>
      <h2>Statistics</h2>
      </div>
      <div>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Good:</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral:</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad:</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>All:</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>Average:</td>
              <td>{average.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Positive Percentage:</td>
              <td>{positivePercentage.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      )}
     </div>
    </div>
  );
}
     

const Button = ({ good, setGood, bad, setBad, neutral, setNeutral }) => {
 
  const handelGoodFeedback = () => {
    console.log( "Good before click", good);
    const updatedGood = good + 1;
    setGood(updatedGood);
    console.log( "Good after click", updatedGood);
}

const handelNeutralFeedback = () => {
  console.log( "Neutral before click", neutral);
  const updatedNeutral = neutral + 1;
  setNeutral(updatedNeutral);
  console.log( "Neutral after click", updatedNeutral);

}

const handelBadFeedback = () => {
  console.log( "Bad before click", bad);
  const updatedBad = bad + 1;
  setBad(updatedBad);
  console.log( "Bad after click", updatedBad);
}

return (
  <div>
    <button onClick={handelGoodFeedback}> Good </button>
    <button onClick={handelNeutralFeedback}> Neutral </button>
    <button onClick={handelBadFeedback}> Bad </button>
  </div>
)
}
  


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button good={good} setGood={setGood} bad={bad} setBad={setBad} neutral={neutral} setNeutral={setNeutral} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App;