import { useState } from 'react';

const Button = ({ codes, selected, setSelected, votes, setVotes }) => {

    const handleButtonClick = () => {
        const randomIndex = Math.floor(Math.random() * codes.length);
        console.log("Random index generated:", randomIndex);
        setSelected(randomIndex);
        
      }

      const handleVote = () => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);
      }
    

    return (
        <div>
          <div>
        <button onClick={handleButtonClick}>Next Anecdote</button>
        </div>
       <div>
        <button onClick={handleVote}>Vote</button>
       </div>
        </div>
    );
}

const DisplayAnecdote = ({ codes, selected }) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
          <strong>
            {codes[selected]}
            </strong>
        </div>
    );
}

const Statistics = ({ votes }) => {
   const totalVotes = votes.reduce((sum, vote) => sum + vote, 0);
   

   if (totalVotes === 0) {
    return <p>No votes given</p>;
  }
  
  return (
    <div>
      <h3>Statistics</h3>
      <p>Total votes: {totalVotes}</p>
    </div>
  );
}

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initialVotes = Array(anecdotes.length).fill(0);

  const DisplayMostVotedAnecdote = ({ codes, votes }) => {
    const maxVotes = Math.max(...votes);
    const mostVotedIndex = votes.indexOf(maxVotes);

    if (maxVotes === 0) {
      return <p>No votes given</p>;
    }

    return (
      <div>
        <h3>Anecdote with most votes</h3>
        <p>{codes[mostVotedIndex]}</p>
        <p>has {maxVotes} votes</p>
      </div>
    );
  }

const App = () => {
  
   
  const [selected, setSelected] = useState(0);
  const [codes, setCodes] = useState(anecdotes);
  const [votes, setVotes] = useState(initialVotes);

  return (
    <div>
      <div>
        <DisplayAnecdote codes={codes} selected={selected} />
      </div>
      
      <div>
      <Button codes={codes} selected = { selected } setSelected={setSelected} votes={votes} setVotes={setVotes} />
      </div>
     

     <div>
      <Statistics votes={votes} setVotes={setVotes} />
      {votes[selected] > 0 && (
        <table>
          <tbody>
            <tr>
              <td>Votes for this anecdote:</td>
              <td>{votes[selected]}</td>
            </tr>
          </tbody>
        </table>
      )}
     </div>
      <div> 
        <DisplayMostVotedAnecdote codes={codes} votes={votes} />
      </div>
    </div>
    
  )
}

export default App;