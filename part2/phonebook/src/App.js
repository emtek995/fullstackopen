import React, {useState, useEffect} from 'react'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  let notification = {
    color: 'green',
    fontSize: 24,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  }

  if (message.error) {
    notification.color = 'red'
  }

  return(
    <div style={notification}>
      {message.message}
    </div>
  )
}

const Filter = ({handleSearch}) => {
  return(
    <div>
      filter shown with: <input onInput={handleSearch}/>
    </div>
  )
}

const PersonForm = ({newName, handleName, newNumber, handleNumber, addButtonClick}) => {
  return(
    <form>
    <div>
      name: <input value={newName} onInput={handleName}/>
    </div>
    <div>
      number: <input value={newNumber} onInput={handleNumber}/>
    </div>
    <div>
      <button type="submit" onClick={addButtonClick}>add</button>
    </div>
    </form>
  )
}

const Persons = ({persons, filter, deleteButtonClick}) => {
  return(
    <div>
    {persons.filter(person => {
      if (filter.length !== 0) {
        return (person.name.toLowerCase().includes(filter))
      }
      return true
    })
    .map(person => {
      return (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteButtonClick(person)}>delete</button>
        </div>)
    })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(personList => {
      setPersons(personList)
    })
  },[])
  
  const deleteButtonClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .catch(() => {
          setMessage({
            error: true,
            message: `Information of ${person.name} has already been removed from server`,
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
  }
  
  const addButtonClick = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const person = persons.find(person => person.name === newName)
    if (person !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(person.id, newPerson)
        setPersons(persons.filter(p => p.name !== person.name).concat(newPerson))
      }
    } else {
       personService.addNew(newPerson)
        .then(newPerson => {
      setPersons(persons.concat(newPerson))
    })
    }
    setNewName('')
    setNewNumber('')
    setMessage({
      error: false,
      message: `Added ${newPerson.name}`})
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  
  const handleName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter handleSearch={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm handleName={handleName} handleNumber={handleNumber} newName={newName} newNumber={newNumber} addButtonClick={addButtonClick}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteButtonClick={deleteButtonClick} />
    </div>
  )
}

export default App;
