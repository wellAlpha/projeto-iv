import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  getAllAutor,
  saveAutor,
  deleteAutor,
  updateAutor,
} from "../services/autorService";
import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { CreateAutorDialog, EditAutorDialog } from "../dialogs/autor";
import { red } from "@mui/material/colors";

function AutorPage() {
  const columns = [
    { field: "id", headerName: "Id", width: 70, sortable: false },
    { field: "nome", headerName: "Nome", width: 200, sortable: false },
    {
      field: "acoes",
      headerName: "Ações",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Editar"
            color="primary"
            onClick={() => handleEdit(params.row)}
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
  const [autor, setAutor] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleClickOpenEdit = () => setOpenDialogEdit(true);

  const handleCloseEdit = () => setOpenDialogEdit(false);

  useEffect(() => {
    getAutores();
  }, []);

  const handleUpdate = async (autor) => {
    try {
      await updateAutor(autor);
      await getAutores();
    } catch (error) {
      console.error(error);
    }
  };

  const getAutores = async () => {
    try {
      setLoading(true);
      const response = await getAllAutor();
      setAutores(response.data.filter(autor => autor.ativo));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      await saveAutor(data);
      await getAutores();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (autor) => {
    handleClickOpenEdit();
    setAutor(autor);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAutor(id);
      await getAutores();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-9/10">
      <CreateAutorDialog
        open={open}
        handleSave={handleSave}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <Box>
        <DataGrid
          loading={loading}
          sx={{ height: "23rem", overflow: "none" }}
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
      <EditAutorDialog
        openDialogEdit={openDialogEdit}
        handleCloseEdit={handleCloseEdit}
        handleUpdate={handleUpdate}
        autor={autor}
      />
    </div>
  );
}

export default AutorPage;
