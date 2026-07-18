import { Alert } from '@mui/material';
import { useBlogStore, selectNotification } from '../store';

const Notification = () => {
  
  const notification = useBlogStore(selectNotification);

 
  if (!notification) {
    return null;
  }

  return (
    <Alert 
      severity={notification.type} 
      sx={{ marginTop: 2, marginBottom: 2 }}
    >
      {notification.text}
    </Alert>
  );
};

export default Notification;