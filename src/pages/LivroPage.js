import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  getAllLivro,
  saveLivro,
  deleteLivro,
  updateLivro
} from "../services/livroService";
import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { CreateLivroDialog, EditLivroDialog } from "../dialogs/livro";
import { red } from "@mui/material/colors";

function LivroPage() {
  const columns = [
    { field: "id", headerName: "Id", width: 70, sortable: false },
    { field: "titulo", headerName: "Título", width: 100, sortable: false },
    { field: "preco", headerName: "Preço", width: 100, sortable: false },
    { field: "paginas", headerName: "Páginas", width: 100, sortable: false },
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

  const [livros, setLivros] = useState([]);
  const [livro, setLivro] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleClickOpenEdit = () => setOpenDialogEdit(true);

  const handleCloseEdit = () => setOpenDialogEdit(false);

  useEffect(() => {
    getLivros();
  }, []);

  const handleUpdate = async (livro) => {
    try {
      await updateLivro(livro);
      await getLivros();
    } catch (error) {
      console.error(error);
    }
  };

  const getLivros = async () => {
    try {
      setLoading(true);
      const response = await getAllLivro();
      setLivros(response.data.filter(livro => livro.ativo));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      await saveLivro(data);
      await getLivros();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (autor) => {
    handleClickOpenEdit();
    setLivro(autor);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLivro(id);
      await getLivros();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-9/10">
      <CreateLivroDialog
        open={open}
        handleSave={handleSave}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <Box>
        <DataGrid
          loading={loading}
          sx={{ height: "23rem", overflow: "none" }}
          rows={livros}
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
      <EditLivroDialog
        openDialogEdit={openDialogEdit}
        handleCloseEdit={handleCloseEdit}
        handleUpdate={handleUpdate}
        livro={livro}
      />
    </div>
  );
}

export default LivroPage;
