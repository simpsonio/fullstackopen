import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  if (!persons) {
    return null
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNotificationMessage = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  //if filter exists then filter persons, else just assign to persons
  const filteredPersons = filter ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) :
    persons


  const addName = (event) => {
    //prevent default action, so page doesn't reload
    event.preventDefault()

    //check if name already in phonebook
    //assigning to variable so we don't run search twice
    const existingPerson = persons.filter(person => person.name === newName)
    if (existingPerson.length > 0) {
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmation) {
        const personObject = {
          name: newName,
          number: newNumber
        }

        personService
          .update(existingPerson[0].id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existingPerson[0].id ? returnedPerson : person))
            handleNotificationMessage(`${newName}'s number updated in phonebook`)
          })
          .catch(response => {
            handleErrorMessage(response.message)
          })
      }
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
          handleNotificationMessage(`${newName} added to phonebook`)
        })
        .catch(response => {
          handleErrorMessage(response.message)
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
        .catch(response => {
          handleErrorMessage(`Information of ${person.name} hase already been removed from server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App