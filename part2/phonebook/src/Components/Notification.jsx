const Notification = ({ message, removeMessage }) => {
  if (message !== null) {
    return <div className="notification">{message}</div>
  }

  if (removeMessage !== null) {
    return <div className="remove-notification">{removeMessage}</div>
  }

  return null
}

export default Notification;