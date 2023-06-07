import api from './axios/api'

export async function getAllAutor() {
  return await api.get('/admin/autor/list');
}

export async function saveAutor (autor) {
  return await api.post('/admin/autor/create', autor)
}

export async function updateAutor (autor) {
  return await api.put(`/admin/autor/update/${autor.id}`, { nome: autor.nome })
}

export async function deleteAutor (id) {
  return await api.delete(`/admin/autor/delete/${id}`)
}
