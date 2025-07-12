import React from 'react'
import App from './App'
import personsService from './services/persons'

function PersonForm({addNameNumber,newName,newNumber,nameBox,numberBox}) {
  return (
    <div>
        <form onSubmit={addNameNumber}>
          <div>name: <input value={newName} onChange={nameBox} /></div>
          <div>number: <input value={newNumber} onChange={numberBox} /></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm