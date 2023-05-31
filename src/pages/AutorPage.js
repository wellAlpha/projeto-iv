import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import getAllAutor from "../services/autor/getAllAutor";
const columns = [
  { field: "id", headerName: "ID", width: 70, sortable: false },
  { field: "firstName", headerName: "First name", width: 130, sortable: false },
  { field: "lastName", headerName: "Last name", width: 130, sortable: false },
];


function AutorPage() {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    getAutores();
  }, []);

  const getAutores = async () => {
    try {
      const response = await getAllAutor();
      setAutores(response);
    } catch (error) {
      console.error("Erro ao buscar autores.");
    }
  };
  return (
    <div className="w-9/10">
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
    </div>
  );
}

export default AutorPage;
