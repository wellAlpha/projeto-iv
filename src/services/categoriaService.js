import api from './axios/api'

export async function getAllCategoria(categoria) {
  return await api.get('/admin/categoria/list');
}

export async function saveCategoria (categoria) {
  return await api.post('/admin/categoria/create', categoria)
}

export async function updateCategoria (categoria) {
  return await api.put(`/admin/categoria/update/${categoria.id}`, { descricao: categoria.descricao })
}

export async function deleteCategoria (id) {
  return await api.delete(`/admin/categoria/delete/${id}`)
}