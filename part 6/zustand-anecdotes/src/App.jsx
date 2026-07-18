import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import VisibilityFilter from "./components/VisibilityFilter"
import Notification from "./components/Notification"

const App = () => {
 
  return(
    <>
       <Notification />
       <VisibilityFilter />
       <AnecdoteList />
       <AnecdoteForm />
    </>
  )
}

export default App