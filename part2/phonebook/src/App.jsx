import { useState, useEffect } from "react";
import newServices from './services/persons';
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Notification from './Components/Notification';


const App = () => {

   const [ persons, setPersons ] = useState([]);
   const [ newName, setNewName ] = useState('');
   const [ number, setNumber ] = useState('');
   const [ searchedTerm, setSearchedTerm ] = useState('');
   const [ message, setMessage ] = useState(null);
   const [ removeMessage, setRemoveMessage ] = useState(null);

   
   useEffect(() => {

        console.log('effect.. ');
        newServices
                   .getAll()
                   .then(initialPersons => {

                     console.log(initialPersons);
                     setPersons(initialPersons);
                   })

   }, []);

   console.log('render',persons.length,'persons');
   

   

   return (

    <>
       <h2>Phonebook</h2>

       <Notification message = { message } removeMessage = { removeMessage } />
      
       <Filter searchedTerm = { searchedTerm } setSearchedTerm = { setSearchedTerm }/>
       
        <h3>Add a new</h3>

        <PersonForm persons = { persons } setPersons = { setPersons }
                    newName = { newName } setNewName = { setNewName }
                    number = { number } setNumber = { setNumber }
                    setMessage = { setMessage }
                      />
        
        <h3>Numbers</h3>
        
        <Persons  persons = { persons } searchedTerm = { searchedTerm } setPersons = { setPersons }
         setRemoveMessage = { setRemoveMessage } />
    </>
   )
}

export default App;