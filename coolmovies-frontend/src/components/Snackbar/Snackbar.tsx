import React from 'react';

import { Snackbar as MuiSnackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { ISnackbar } from '../../types/typings';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Snackbar = ({ open, severity, message, onClose }: ISnackbar) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
