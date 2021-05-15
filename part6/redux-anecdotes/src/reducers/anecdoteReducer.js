import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    case 'ADD_VOTE':
      const id = action.data.id
      const votedAnecdote = action.data
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(anecdoteToUpdate)
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer
