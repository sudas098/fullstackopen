import useAnecdotes from "../hooks/useAnecdotes"

const AnecdoteList = ({ anecdotes, remove }) => {

  

  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content} <button onClick={() => remove(anecdote.id)}>delete</button></li>)}
    </ul>
  </div>
)
}

export default AnecdoteList
