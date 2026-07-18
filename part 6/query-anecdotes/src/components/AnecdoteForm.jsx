import { useAnecdotes } from "../hooks/useAnecdotes"
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const { addAnecdotes: addAnecdotesToServer } = useAnecdotes();

  const { setNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      setNotification('Anecdote must be at least 5 characters long')
      setTimeout(() => {
      setNotification(null)
    },5000)
      return 
    }


    event.target.reset()
    console.log('new anecdote')
    addAnecdotesToServer(content)
    setNotification(`${content} added`)
    setTimeout(() => {
      setNotification(null)
    },5000)

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm