

const Filter = ({  searchedTerm, setSearchedTerm }) => {

   const handleChange = (e) => {
  setSearchedTerm(e.target.value)
}
  
  return (
    <>
        <div>
           <input 
            type="text"
            placeholder="Enter name... "
            value={searchedTerm}
            onChange={handleChange} 
          />
        </div>
        
    </>
  )
}

export default Filter