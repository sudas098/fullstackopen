import { useNotification } from "../store"

const Notification = () => {
  const style = {
    color: 'green',
    border: '1px solid lightgreen',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };

  const notification = useNotification();

  if (!notification) return null;

  return <div style={style}> { notification } </div>
}

export default Notification