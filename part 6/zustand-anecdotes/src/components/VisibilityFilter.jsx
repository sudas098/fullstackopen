import { useSearchAcion } from "../store";

const VisibilityFilter = () => {
  
    const setSearchedAnecdote = useSearchAcion();

    return(
        <>
          <input type="text"
          name="searchedAnecdotes"
          onChange={(e) => setSearchedAnecdote(e.target.value)} />
        </>
    )
}

export default VisibilityFilter;