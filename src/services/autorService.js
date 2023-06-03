import api from './axios/api'

export async function getAllAutor() {
  return await api.get('/admin/autor/list');
}

export async function saveAutor (autor) {
  return await api.post('/admin/autor/create', autor)
}
