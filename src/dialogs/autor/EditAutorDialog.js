import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditAutorDialog({ autor, openDialogEdit, handleCloseEdit, handleUpdate }) {
  const [formData, setformData] = useState({ nome: undefined })
  useEffect(() => {
    setformData((prevAutor) => ({
      ...prevAutor,
      ...autor
    }))
  }, [autor])

  const handleSubmit = async () => {
    await handleUpdate (formData)
    handleCloseEdit()
  }
  return (
    <div>
      <Dialog open={openDialogEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edição de autor.</DialogTitle>
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
              setformData((prevAutor) => ({
                ...prevAutor,
                nome: event.target.value
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}