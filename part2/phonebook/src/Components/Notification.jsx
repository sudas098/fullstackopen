const Notification = ({ message, removeMessage, errorMessage }) => {
  if (message !== null) {
    return <div className="notification">{message}</div>
  }

  if (removeMessage !== null) {
    return <div className="remove-notification">{removeMessage}</div>
  }

  if ( errorMessage !== null ) {

  return <div className="error-message"> {errorMessage} </div>
}

  return null

}



export default Notification;