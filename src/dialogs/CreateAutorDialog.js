import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateAutorDialog({ handleSave }) {
  const [formData, setformData] = useState({ nome: undefined })
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    await handleSave(formData)
    setformData({ nome: undefined })
    handleClose()
  }
  return (
    <div>
      <Button onClick={handleClickOpen}>Criar</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro de autores.</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            color="secondary"
            fullWidth
            variant="standard"
            value={formData.nome}
            onChange={(event) => {
              setformData({ nome: event.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}