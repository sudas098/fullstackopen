import { useState, useEffect } from "react";
import anecdotesServices from "../services/anecdotes";

const useAnecdotes = () => {

    const [ anecdotes, setAnecdotes ] = useState([]);

    useEffect(() => {

        const fetchingData = async () => {

            const data = await anecdotesServices.getAll();

            setAnecdotes(data);
        }

        fetchingData();
    },[])

    const addAnecdote = async (anecdote) => {
     const saved = await anecdotesServices.createNew(anecdote)
     setAnecdotes(anecdotes.concat(saved))
  }

  const remove = async (id) => {

    await anecdotesServices.removeOne(id);

    setAnecdotes(anecdotes.filter(a => a.id !== id));
    
  }

    return { anecdotes, setAnecdotes, addAnecdote, remove }
}

export default useAnecdotes;