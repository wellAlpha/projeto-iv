import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import getAllAutor from "../services/autor/getAllAutor";
import { Box, Button } from "@mui/material";
import { Add } from '@mui/icons-material';
import { CreateAutorDialog } from "../components/dialogs";
const columns = [
  { field: "id", headerName: "ID", width: 70, sortable: false },
  { field: "firstName", headerName: "First name", width: 130, sortable: false },
  { field: "lastName", headerName: "Last name", width: 130, sortable: false },
];


function AutorPage() {
  const [autores, setAutores] = useState([]);
  const [open, setOpen] = useState(false);

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
      const response = await getAllAutor();
      setAutores(response);
      console.log(autores)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-9/10">
      <Box>
        <Button onClick={handleClickOpen}>Criar</Button>
        <DataGrid
          rows={autores}
          columns={columns}
          disableColumnMenu={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      </Box>
      <CreateAutorDialog handleClickOpen={handleClickOpen} open={open} handleClose={handleClose} />
    </div>
  );
}

export default AutorPage;
