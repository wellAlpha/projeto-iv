import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateEditoraDialog({ handleSave, open, handleClose, handleClickOpen }) {
  const [formData, setformData] = useState({ nome: undefined })
  
  const handleSubmit = async () => {
    await handleSave(formData)
    setformData({ descricao: undefined })
    handleClose()
  }
  return (
    <div>
      <Button onClick={handleClickOpen}>Criar</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro de Editora.</DialogTitle>
        <DialogContent>
          <TextField
            categoriaFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            type="text"
            color="secondary"
            fullWidth
            variant="standard"
            value={formData.descricao}
            onChange={(event) => {
              setformData({ descricao: event.target.value });
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