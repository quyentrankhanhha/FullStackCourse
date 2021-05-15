import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (Boolean(filter)) {
      const filteredAnecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )

      return filteredAnecdotes
    }

    return anecdotes
  })

  const sortedByVotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(showNotification(`you vote ${anecdote.content}`), 5)
  }

  return (
    <div>
      {sortedByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
