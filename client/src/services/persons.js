import axios from 'axios'
import App from '../App'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
    .then(response => {
      return response.data})
}

const create = (personObject) => {
    return axios.post(baseUrl,personObject)
    .then(response => {
        //console.log(response.data)
        return response.data})
}

const remove = (id,persons,setPersons) => {
    axios.get(`${baseUrl}/${id}`)
    .then(response => {
        const person = response.data
        console.log(person)
        if (window.confirm(`Delete ${person.name} ?`)) {
            axios.delete(`${baseUrl}/${id}`)
            .then(()=> {
            console.log('deleted')
            setPersons(persons.filter(p=> p.id !== id))
            })
        } 
    })       
}

const update = (newName, newNumber,persons,setPersons,displayMessage,setMessage,setMessageType) => {
    getAll()
    .then(response => {
        const personObject = response
        console.log(personObject)
        const findName = personObject.find(persons => persons.name === newName )
        const id = findName.id
        const changedPerson = {...findName, number: newNumber}
        if (findName) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                axios.put(`${baseUrl}/${id}`,changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map (person => person.id === id ? returnedPerson.data : person))
                    displayMessage(newName)
                })
                .catch (error => {
                    console.log(error)
                })
            }
        }
    }    
    )
    .catch(error => {
        setMessage(`Information of ${newName} has already been removed from server`)
        setMessageType('error')
        setTimeout(() => {
            setMessage('')
        },3000)
        console.log(error)
    })
}

export default {
    getAll,
    create,
    remove,
    update
}