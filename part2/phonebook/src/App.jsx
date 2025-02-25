import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
useEffect(() => {
  personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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

      personService
        .create(personObject)
        .then(returnedPerson => {
          //set persons to new object, avoiding direclty altering state
          setPersons(persons.concat(returnedPerson))
        })
    }

    //reset input forms to blank
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    const confirmation = window.confirm(`Delete ${person.name}?`)
    if (confirmation) {
      personService
        .remove(person.id)
        .then(returnedPerson => {
          //remove deleted person
          //storing result in new array first
          const filtered = persons.filter(person => person.id != returnedPerson.id)
          setPersons(filtered)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App