import newService from '../services/persons';
const PersonForm = ({ persons, setPersons, newName, setNewName, number, setNumber, setMessage  }) => {

    const handleInput = (e) => {

       console.log(e.target.value);
       setNewName(e.target.value);
       
   }

   const handleNumber = (e) => {

       console.log(e.target.value);
       setNumber(e.target.value);
   }

   const addNewName = (e) => {

            if (!newName || !number) {
        alert("Please fill both fields")
        return
        }

       e.preventDefault();
       console.log(e.target);
       const newPerson = {
            name: newName,
            number: number,
            }
       console.log([...newName])
        const personExist = persons.some(person => person.name === newName);
                if (personExist) {

                    alert(`${newName} already exist`);
                } else {
              newService
                        .create(newPerson)
                        .then(returnPerson => {

                            console.log(returnPerson);
                            setPersons(persons.concat(returnPerson));
                            setNewName('');
                            setNumber('');
                            setMessage(`Add '${returnPerson.name}'`);
                            setTimeout(() => {
                               setMessage(null)
                            },2000);
                        })
                
                  }
        
        
   }


    return (

        <>
          
        <form 
          onSubmit={ addNewName }
           >
          <div>
            name: <input 
             value={ newName }
              onChange={ handleInput}/>
               </div>

               <div>
                 number:<input 
                  value={number}
                  onChange={ handleNumber }
                   />
               </div>

              <div>
              <button
             type="submit"
               >
              add
            </button>
            </div>
         
         
        </form>
        </>
    )
}

export default PersonForm