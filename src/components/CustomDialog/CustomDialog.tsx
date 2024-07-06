import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string | JSX.Element;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({ open, handleClose, title, description }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ fontSize: 64, fontFamily: 'Nabla' }}>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
