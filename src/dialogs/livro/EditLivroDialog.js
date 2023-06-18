import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllCategoria } from "../../services/categoriaService";
import { getAllAutor } from "../../services/autorService";
import { getAllEditora } from "../../services/editoraService";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import ImageUploader from "../../components/ImageUploader";

export default function EditLivroDialog({
  livro,
  openDialogEdit,
  handleCloseEdit,
  handleUpdate,
}) {
  const [formData, setformData] = useState({
    titulo: undefined,
    preco: undefined,
    categoria: "",
    editora: "",
    autor: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleImageUpload = (imageUrl) => {
    setUploadedImageUrl(imageUrl);
  };

  const getCategorias = async () => {
    const response = await getAllCategoria();
    setCategorias(response.data.filter((cat) => cat.ativo));
  };

  const getAutores = async () => {
    const response = await getAllAutor();
    setAutores(response.data.filter((autor) => autor.ativo));
  };

  const getEditoras = async () => {
    const response = await getAllEditora();
    setEditoras(response.data.filter((editora) => editora.ativo));
  };

  useEffect(() => {
    getCategorias();
    getAutores();
    getEditoras();
    setformData(() => ({
      ...livro,
      categoria: livro?.categoria?.id || '',
      editora: livro?.editora?.id || '',
      autor: livro?.autor?.id || '',
    }));
  }, [livro]);

  const handleSubmit = async () => {
    const objUpdate = {
      "id": formData.id,
      "titulo": formData.titulo,
      "paginas": formData.paginas,
      "pathFoto": uploadedImageUrl || null,
      "preco": formData.preco,
      "categoria": {
        "id": formData.categoria,
        
      },
      "editora": {
        "id": formData.editora,
       
      },
      "autor": {
      "id": formData.autor,
      
      }
    }
    await handleUpdate(objUpdate);
    handleCloseEdit();
  };
  return (
    <div>
      <Dialog open={openDialogEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edição de autor.</DialogTitle>
        <DialogContent>
          <Box>
            <Stack
              spacing={{ xs: 2, sm: 4 }}
              marginTop={2}
              direction="row"
              useFlexGap
            >
              <FormControl>
                <InputLabel htmlFor="titulo">Título</InputLabel>
                <OutlinedInput
                  id="titulo"
                  label="Título"
                  value={formData.titulo}
                  onChange={(event) => {
                    setformData((prevTitulo) => ({
                      ...prevTitulo,
                      titulo: event.target.value,
                    }));
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="preco">Preço</InputLabel>
                <OutlinedInput
                  id="preco"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Preço"
                  value={formData.preco}
                  onChange={(event) => {
                    setformData((prevPreco) => ({
                      ...prevPreco,
                      preco: event.target.value,
                    }));
                  }}
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="paginas">Páginas</InputLabel>
                <OutlinedInput
                  id="paginas"
                  label="Páginas"
                  value={formData.paginas}
                  onChange={(event) => {
                    setformData((prevPaginas) => ({
                      ...prevPaginas,
                      paginas: event.target.value,
                    }));
                  }}
                />
              </FormControl>
            </Stack>
            <Stack
              spacing={{ xs: 2, sm: 4 }}
              marginTop={3}
              direction="row"
              useFlexGap
            >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="categoriaLabelId">Categoria</InputLabel>
                <Select
                  labelId="categoriaLabelId"
                  id="id"
                  value={formData.categoria}
                  label="Categoria"
                  onChange={(event) => {
                    setformData((prevCategoria) => ({
                      ...prevCategoria,
                      categoria: event.target.value,
                    }));
                  }}
                >
                  {categorias?.map((categoria, idx) => (
                    <MenuItem value={categoria.id} key={idx}>
                      {categoria.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="autorLabelId">Autor</InputLabel>
                <Select
                  labelId="autorLabelId"
                  id="id"
                  value={formData.autor}
                  label="Autor"
                  onChange={(event) => {
                    setformData((prevCategoria) => ({
                      ...prevCategoria,
                      autor: event.target.value,
                    }));
                  }}
                >
                  {autores?.map((autor, idx) => (
                    <MenuItem value={autor.id} key={idx}>
                      {autor.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="editoraLabelId">Editora</InputLabel>
                <Select
                  labelId="editoraLabelId"
                  id="id"
                  value={formData.editora}
                  label="Editora"
                  onChange={(event) => {
                    setformData((prevEditora) => ({
                      ...prevEditora,
                      editora: event.target.value,
                    }));
                  }}
                >
                  {editoras?.map((editora, idx) => (
                    <MenuItem value={editora.id} key={idx}>
                      {editora.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Box>
            <h1>Upload de Imagem</h1>
            <ImageUploader onImageUpload={handleImageUpload} />
            {uploadedImageUrl && (
              <Box>
                <h2>Imagem Carregada</h2>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
