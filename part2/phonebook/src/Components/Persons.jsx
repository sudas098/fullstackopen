import newService from '../services/persons';
const Persons = ({  persons, searchedTerm, setPersons, setRemoveMessage,newName,  number, setNewName, setNumber  }) => {

    const filteredPersons = persons.filter((person) =>
      
         person?.name?.toLowerCase().includes(searchedTerm.toLowerCase())
      )

      const handleDletion = (id) => {
        
        const personToRemove = filteredPersons.find((person) => person.id === id );
        if (window.confirm(`Are you sure to Delete ${personToRemove.name}`)) {
        newService
                  .remove(id)
                  .then(returnedPerson => {

                    console.log(returnedPerson);
                    setPersons(persons.filter(person => person.id !== id));
                  })
                  .catch (error => {
                setRemoveMessage(`The person '${personToRemove.name}' was already deleted from server`);
                setTimeout(() => {
                  setRemoveMessage(null);
                },1000);
            setPersons(persons.filter(p => p.id !== id))
          
        })
                } 
      }

      const handleUpdate = (id) => {

        const personToUpdate = persons.find((person) => person.id === id)
        if (window.confirm(`Are you sure to make change in ${personToUpdate.name}`)) {
          const changedPerson = {...personToUpdate,name: newName, number: number}
          newService
                    .update(id, changedPerson)
                    .then(updatedPerson => {
                      setPersons(persons.map(p => p.id !== id ? p : updatedPerson))
                      setNewName('');
                     setNumber('');
                    })
                    
        }
      }

    return (
        <>
          <div>
          { filteredPersons.map((person) => (

            <div key={ person.id }>
               <div> <strong>{ person.name }</strong> { person.number }</div> 
               <button 
                onClick= {() => handleDletion(person.id)}>
                Delete
               </button>
               <button 
                onClick={() => handleUpdate(person.id)}>
                Update
               </button>
               </div>
          ))}
        </div>
        </>
    )
}

export default Persons