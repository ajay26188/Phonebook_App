import { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import personsService from './services/persons'

const Notification = ({message,messageType}) => {
  if (!message) return null

  const messageStyle = {
    color: messageType === 'success' ? 'green' : 'red',
    padding: '10px',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius : '5px',
    marginBottom: '10px'
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService.getAll()
    .then (initialPersons => setPersons(initialPersons))
    },[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] =useState('')
  const [message,setMessage] = useState('')
  const [messageType,setMessageType] = useState('')

  const nameBox = (event) => {
    setNewName(event.target.value)
  }

  const numberBox = (event) => {
    setNewNumber(event.target.value)
  }

  const filterBox = (event) => {
    setFilterInput(event.target.value)
  }

  const displayMessage = (name) => {
    console.log(name)
    setMessage(`Added ${name}`)
    setMessageType('success')
    setTimeout(()=> {
    setMessage('')
    },3000)
  }

  const addNameNumber = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      //id: (persons.length+1).toString()
    }
    const checkNameExistence = persons.find(p => p.name === newPerson.name)
    //console.log(persons[0].name)
    //console.log(newName)

    if(checkNameExistence) {
      personsService.update(newName,newNumber,persons,setPersons,displayMessage,setMessage,setMessageType)
      setNewName('')
      setNewNumber('')
      /*alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      */
    } else {
      personsService.create(newPerson)
      .then(returnedPersonObject => {
        setPersons(persons.concat(returnedPersonObject))
        displayMessage(newPerson.name)
        
      })
      .catch(error => {
        const message = error.response.data.error
        //console.log(error.response.data.error)
        setMessage(`Added ${message}`)
        setMessageType('failure')
        setTimeout(()=> {
        setMessage('')
        },3000)
      })
      setNewName('')
      setNewNumber('') 
    }
    console.log(newPerson)
    console.log(checkNameExistence)
    
} 
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />

      <Filter filterInput={filterInput} filterBox={filterBox}/>

      <h2>add a new</h2>
      <PersonForm addNameNumber={addNameNumber} nameBox={nameBox} numberBox={numberBox} newName={newName} newNumber={newNumber} persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterInput={filterInput} setPersons={setPersons}  />
      
    </div>
  )
}

export default App