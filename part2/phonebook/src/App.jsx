import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
}, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //if filter exists then filter persons, else just assign to persons
  const filteredPersons = filter ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) :
    persons


  const addName = (event) => {
    //prevent default action, so page doesn't reload
    event.preventDefault()

    //check if name already in phonebook
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    //else we can add name
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
        })
      //set persons to new object, avoiding direclty altering state
      setPersons(persons.concat(personObject))
    }

    //reset input forms to blank
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App