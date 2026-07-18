import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, creat, remove, update } from "../requests";

export const useAnecdotes = () => {
    
    const queryClient = useQueryClient();

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const newAnecdoteMutation = useMutation({
        mutationFn: creat,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        }
    });

    const updateAnecdoteMutation = useMutation({
        mutationFn: update,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'],
                anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
        }
    })

    return {

        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        errorMessage: result.error?.message,
        addAnecdotes: (content) => newAnecdoteMutation.mutate({content, votes: 0}),
        updatedAnecdotes: (updatedAnecdote) => updateAnecdoteMutation.mutate(updatedAnecdote)
    }
}