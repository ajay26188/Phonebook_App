import React from 'react'
import App from './App'
import personsService from './services/persons'

const Persons = ({persons,filterInput,setPersons}) => {
    //console.log(persons)
    if (filterInput !== null) {
        return (
          <div>
            {persons.filter(p => p.name.toLowerCase().includes(filterInput)).map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => personsService.remove((person.id),persons,setPersons)}>delete</button></li>)}
          </div>
        )
      }

    return (
      <div>
        {persons.map (person => <li key={person.id}>{person.name} {person.number}</li>)}
      </div>
    )
  }

export default Persons