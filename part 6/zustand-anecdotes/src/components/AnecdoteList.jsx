import { useVoteAction, useSortedAnecdotes, useInitializeAction, useRemoveAnecdotes } from "../store";
import { useEffect } from "react";

const AnecdoteList = () => {
 
     const anecdotes = useSortedAnecdotes();
     const  voteAnecdote  = useVoteAction();
     const initialize = useInitializeAction();
     const remove = useRemoveAnecdotes();

     useEffect(() => {

        initialize();
     }, [initialize]);

     return (
        <>
           <h2>
            Anecdotes
           </h2>

           <div>
              { anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div> { anecdote.content } </div>
                    <div>
                        has { anecdote.votes }
                        <button
                        onClick={() => voteAnecdote(anecdote.id)}>
                            vote
                        </button>
                        <button
                         onClick={() => remove(anecdote.id)}>delete</button>
                    </div>
                </div>
              ))}
           </div>
        </>
     )
}

export default AnecdoteList;