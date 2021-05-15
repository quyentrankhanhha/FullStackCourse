const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

let timeoutID

export const showNotification = (message, time) => {
  return async (dispatch) => {
    clearTimeout(timeoutID)
    dispatch({ type: 'SHOW_NOTIFICATION', message })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer
