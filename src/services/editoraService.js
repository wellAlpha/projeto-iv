import api from './axios/api'

export async function getAllEditora() {
  return await api.get('/admin/editora/list');
}


