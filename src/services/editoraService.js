import api from './axios/api'

export async function getAllEditora() {
  return await api.get('/admin/editora/list');
}

export async function saveEditora (editora) {
  return await api.post('/admin/editora/create', editora)
}

export async function updateEditora (editora) {
  return await api.put(`/admin/editora/update/${editora.id}`, { descricao: editora.descricao })
}

export async function deleteEditora (id) {
  return await api.delete(`/admin/editora/delete/${id}`)
}
