import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState} from "react";

import {
    getAllCategoria,
    saveCategoria,
    deleteCategoria,
    updateCategoria,
}from "../services/categoriaService";
import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { CreateCategoriaDialog, EditCategoriaDialog } from "../dialogs/categoria";
import { red } from "@mui/material/colors";


function CategoriaPage() {
    const columns = [
      { field: "id", headerName: "Id", width: 70, sortable: false },
      { field: "descricao", headerName: "Descrição", width: 200, sortable: false },
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
  
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
  
    const handleClickOpen = () => setOpen(true);
  
    const handleClose = () => setOpen(false);
  
    const handleClickOpenEdit = () => setOpenDialogEdit(true);
  
    const handleCloseEdit = () => setOpenDialogEdit(false);
  
    useEffect(() => {
      getCategorias();
    }, []);
  
    const handleUpdate = async (categoria) => {
      try {
        await updateCategoria(categoria);
        await getCategorias();
      } catch (error) {
        console.error(error);
      }
    };
  
    const getCategorias = async () => {
      try {
        setLoading(true);
        const response = await getAllCategoria();
        setCategorias(response.data.filter(categoria => categoria.ativo));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSave = async (data) => {
      try {
        await saveCategoria(data);
        await getCategorias();
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleEdit = async (categoria) => {
      handleClickOpenEdit();
      setCategoria(categoria);
    };
  
    const handleDelete = async (id) => {
      try {
        await deleteCategoria(id);
        await getCategorias();
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="w-9/10">
        <CreateCategoriaDialog
          open={open}
          handleSave={handleSave}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
        <Box>
          <DataGrid
            loading={loading}
            sx={{ height: "23rem", overflow: "none" }}
            rows={categorias}
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
        <EditCategoriaDialog
          openDialogEdit={openDialogEdit}
          handleCloseEdit={handleCloseEdit}
          handleUpdate={handleUpdate}
          categoria={categoria}
        />
      </div>
    );
  }
  
  export default CategoriaPage;
  