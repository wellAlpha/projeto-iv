import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:8080/api/bookstore', headers: {
    'Content-Type': 'application/json',
    },
    mode: 'cors'
  })

export default api