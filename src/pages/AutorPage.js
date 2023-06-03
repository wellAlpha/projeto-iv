import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllAutor, saveAutor } from "../services/autorService";
import { Box, Button, IconButton } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material'
import { CreateAutorDialog } from "../components/dialogs";
import { red } from "@mui/material/colors";


function AutorPage() {
  const columns = [
    { field: "id", headerName: "Id", width: 70, sortable: false },
    { field: "nome", headerName: "Nome", width: 200, sortable: false },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Editar"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="Excluir"
            sx={{ color: red[500] }}
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];
  
  const [autores, setAutores] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAutores();
  }, []);

  const getAutores = async () => {
    try {
      setLoading(true)
      const response = await getAllAutor();
      setAutores(response.data);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  const handleSave = async (data) => {
    await saveAutor(data)
    handleClose()
    await getAutores()
  }

  const handleEdit = async (id) => {

  }

  const handleDelete = async (id) => {

  }

  return (
    <div className="w-9/10">
      <Box>
        <Button onClick={handleClickOpen}>Criar</Button>
        <DataGrid
          loading={loading}
          sx={{ height: '23rem', overflow: 'unset' }}
          rows={autores}
          columns={columns}
          rowSelection={false}
          disableColumnMenu={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        />
      </Box>
      <CreateAutorDialog handleSave={handleSave} handleClickOpen={handleClickOpen} open={open} handleClose={handleClose} />
    </div>
  );
}

export default AutorPage;
