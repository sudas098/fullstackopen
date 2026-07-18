import { useState, useImperativeHandle, forwardRef } from 'react';
import { Box, Button } from '@mui/material';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <Box sx={{ my: 2 }}>
      <Box style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>

      <Box style={showWhenVisible}>
        {props.children}
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={toggleVisibility}
          sx={{ mt: 1 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;