import axios from "axios";

const config = {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer seu_token_de_autenticacao'
    },
    mode: 'cors'
  };
export default async function getAllAutor() {
  return await axios('http://localhost:8080/api/bookstore/admin/autor/list', config);
}
