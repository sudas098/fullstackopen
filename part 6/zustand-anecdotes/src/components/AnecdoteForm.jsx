import { useAddAction, useSetNotification } from "../store";

const AnecdoteForm = () => {
   
    const addAnecdotes  = useAddAction();
    const setNotification = useSetNotification();

    const createAnecdote = async (e) => {

        e.preventDefault();
        const content = e.target.anecdote.value;
        if (content && content.trim().length > 3) {
           await addAnecdotes(content);
            setNotification(`You added ${content}`);
            
            e.target.anecdote.value = '';
            setTimeout(() => {
                setNotification(null);
            },5000)
        }
        
    }

    return (
    <>
        <section>
            <form onSubmit={createAnecdote}>
                <input
                 name="anecdote"
                 placeholder="Insightful anecdote..." />
                <button type="submit"> create </button>
            </form>    
        </section>    
    </>
  )
}

export default AnecdoteForm;