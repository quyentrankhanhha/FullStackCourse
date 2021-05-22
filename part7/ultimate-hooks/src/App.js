import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => setResources(response.data))
      .catch((error) => console.log('error', error.response))
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => {
        const newResource = response.data
        setResources([...resources, newResource])
      })
      .catch((error) => console.log('error', error.response))
  }

  const service = {
    create
  }

  return [resources, service]
}

const App = () => {
  const { reset: resetContent, ...newContent } = useField('text')
  const { reset: resetName, ...newName } = useField('text')
  const { reset: resetNumber, ...newNumber } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: newContent.value })
    resetContent()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: newName.value, number: newNumber.value })
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...newContent} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...newName} /> <br />
        number <input {...newNumber} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
