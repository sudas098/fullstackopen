import { useFeedBack } from "../store"

const Statistics = () => {
  
  const { good, bad, neutral } = useFeedBack();

  const all = good + bad + neutral;
  const average = all === 0 ? 0 : ( good - bad ) / all;
  const positive = all === 0 ? 0 : ( good/all ) * 100;

  if ( all === 0 ) {
    return(
      <>
       <h2>statistics</h2>
       <p>No feedback given</p>
      </>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average.toFixed(1)}</td></tr>
          <tr><td>positive</td><td>{positive.toFixed(1)}%</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
