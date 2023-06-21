import { CreateEditoraDialog, EditEditoraDialog } from "../dialogs/editora";
import {
    getAllEditora,
    saveEditora,
    deleteEditora,
    updateEditora,
}from "../services/editoraService";
import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";



function EditoraPage() {
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
  
    const [editoras, setEditoras] = useState([]);
    const [editora, setEditora] = useState({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState (false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
  
    const handleClickOpen = () => setOpen(true);
  
    const handleClose = () => setOpen(false);
  
    const handleClickOpenEdit = () => setOpenDialogEdit(true);
  
    const handleCloseEdit = () => setOpenDialogEdit(false);
  
    useEffect(() => {
      getEditoras();
    }, []);
  
    const handleUpdate = async (editora) => {
      try {
        await updateEditora(editora);
        await getEditoras();
      } catch (error) {
        console.error(error);
      }
    };
  
    const getEditoras = async () => {
      try {
        setLoading(true);
        const response = await getAllEditora();
        setEditoras(response.data.filter(editora => editora.ativo));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSave = async (data) => {
      try {
        await saveEditora(data);
        await getEditoras();
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleEdit = async (editora) => {
      handleClickOpenEdit();
      setEditora(editora);
    };
  
    const handleDelete = async (id) => {
      try {
        await deleteEditora(id);
        await getEditoras();
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="w-9/10">
        <CreateEditoraDialog
          open={open}
          handleSave={handleSave}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
        <Box>
          <DataGrid
            loading={loading}
            sx={{ height: "23rem", overflow: "none" }}
            rows={editoras}
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
        <EditEditoraDialog
          openDialogEdit={openDialogEdit}
          handleCloseEdit={handleCloseEdit}
          handleUpdate={handleUpdate}
          editora={editora}
        />
      </div>
    );
  }
  
  export default EditoraPage;
  