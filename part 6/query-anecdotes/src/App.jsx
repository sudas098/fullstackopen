import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {

  const { anecdotes,
        isPending,
        isError,
        errorMessage,
        updatedAnecdotes,} = useAnecdotes();

  const handleVote = (anecdote) => {
    console.log('vote')
    updatedAnecdotes({...anecdote, votes: anecdote.votes + 1});
  }

   if ( isPending ) (
         <>
             <div>Loading... </div> 
         </>
   )

   if (isError) (
      <div style={{ padding: '10px', fontSize: '20px', fontWeight: 'bold' }}>
        anecdote service not available due to problems in server
      </div>
   )

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App