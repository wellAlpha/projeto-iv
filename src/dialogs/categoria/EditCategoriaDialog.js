import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCategoriaDialog({ categoria, openDialogEdit, handleCloseEdit, handleUpdate }) {
  const [formData, setformData] = useState({ descricao: undefined })
  useEffect(() => {
    setformData((prevCategoria) => ({
      ...prevCategoria,
      ...categoria
    }))
  }, [categoria])

  const handleSubmit = async () => {
    await handleUpdate (formData)
    handleCloseEdit()
  }
  return (
    <div>
      <Dialog open={openDialogEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edição de categoria.</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            type="text"
            color="secondary"
            fullWidth
            variant="standard"
            value={formData.descricao}
            onChange={(event) => {
              setformData((prevCategoria) => ({
                ...prevCategoria,
                descricao: event.target.value
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