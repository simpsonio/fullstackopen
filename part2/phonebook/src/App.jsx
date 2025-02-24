import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    //prevent default action so page doesn't reload
    event.preventDefault()
    const personObject = {
      name: newName,
      id: String(persons.length + 1),
    }
    //set persons to new object, avoiding direclty altering state
    setPersons(persons.concat(personObject))
    //person has been added, reset input form to blank
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Person key={person.name} person={person}/>
        )}
      </div>
    </div>
  )
}

export default App