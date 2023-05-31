import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateAutorDialog({ handleClickOpen, handleClose, open }) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastre um novo autor.</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Criar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}