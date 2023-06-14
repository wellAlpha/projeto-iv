import api from './axios/api'

export async function getAllLivro() {
  return await api.get('/admin/livro/list');
}

export async function saveLivro (livro) {
  return await api.post('/admin/livro/create', livro)
}

export async function updateLivro (livro) {
  return await api.put(`/admin/livro/update/${livro.id}`, livro)
}

export async function deleteLivro (id) {
  return await api.delete(`/admin/livro/delete/${id}`)
}
