import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from 'zustand/react/shallow';
import anecdoteServices from './Services/anecdotes'
import anecdotes from "./Services/anecdotes";

const useAnecdotesStore = create(
  immer((set, get) => ({
     
     anecdotes: [],
     initialize: async() => {
      const anecdotes = await anecdoteServices.getAll();

      set(() => ({anecdotes}))
     },
     searchedAnecdotes: '',

     addAnecdotes: async (content) => {

       const anecdote = await anecdoteServices.create(content);

       set(state => {

        state.anecdotes.push(anecdote)
       })
     },

     voteAnecdote: async id => {
       const anecdote = get().anecdotes.find(a => a.id === id);
       try {
             const update = await anecdoteServices.update(id, {
                ...anecdote, votes: anecdote.votes + 1
             })
       } catch (err) {
        console.error(err.message);
        
       }

       set(state => {
        const anecdot = state.anecdotes.find(a => a.id === id);
        if (anecdot) anecdot.votes += 1;
       })
     },
      setSearchedAnecdotes : value=> set({ searchedAnecdotes: value}),
      
      removeAnecdotes: async id => {

        try {
          await anecdoteServices.remove(id)
        } catch (err) {
          console.error(err.message);
          
        }

        set(state => {
          state.anecdotes = state.anecdotes.filter(a => a.id !== id);
        })
      }
  })),
  
);

const useNotificationStore = create(set => ({
  notification: null,
  setNotification: value => set(({ notification: value}))
}))

// In store.js
export const useAnecdotes = () => useAnecdotesStore((state) => state.anecdotes);

export const useSortedAnecdotes = () =>
  useAnecdotesStore(
    useShallow(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes)
                         .filter(anecdote => anecdote.content.toLowerCase()
                         .includes(state.searchedAnecdotes.toLowerCase())))
  )


// store.js
export const useVoteAction = () => useAnecdotesStore((state) => state.voteAnecdote);
export const useAddAction = () => useAnecdotesStore((state) => state.addAnecdotes);
export const useSearchAcion = () => useAnecdotesStore((state) => state.setSearchedAnecdotes);
export const useInitializeAction = () => useAnecdotesStore((state) => state.initialize); 
export const useRemoveAnecdotes = () => useAnecdotesStore((state) => state.removeAnecdotes); 
export const useNotification = () => useNotificationStore(state => state.notification);
export const useSetNotification = () => useNotificationStore(state => state.setNotification);

export default useAnecdotesStore;