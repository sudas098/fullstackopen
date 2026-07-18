import { useFeedbackAction } from "../store"

const Buttons = () => {

  const { incrementGood, incrementBad, incrementNeutral, resetFeedBack } = useFeedbackAction();

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      <button onClick={resetFeedBack}>reset</button>
    </div>
  )
}

export default Buttons
