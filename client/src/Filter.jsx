import React from 'react'
import App from './App'

const Filter = ({filterInput,filterBox}) => {
  return (
    <div>
        filter shown with <input value={filterInput} onChange={filterBox}/>
        
    </div>
  )
}

export default Filter