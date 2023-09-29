import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material/';
import { makeStyles, ThemeProvider } from '@mui/styles';

// import { Dialog,DialogContent,DialogTitle } from '@mui/material/Dialog';

import './Popup.css';

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: ThemeProvider.spacing(2),
    },
  }));

  const classes = useStyles;

  return (
    <div className="main__pop">
      <Dialog
        open={openPopup}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle>
          <div className="pop">
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <button onClick={() => setOpenPopup(false)}>X</button>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
