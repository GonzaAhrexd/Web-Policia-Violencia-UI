// Importa axios para realizar las peticiones HTTP
import axios from './axios'
// Función para registrar un usuario
export const registerRequest = (user: any) => axios.post(`/register`, user)
// Función para dar de alta un usuario
export const altaUsuario = async (data: any) => {
  try {
    const response = await axios.post(`/alta-usuario`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Función para iniciar sesión
export const loginRequest = (user: any) => axios.post(`/login`, user, { withCredentials: true });
// Función para cerrar sesión
export const logoutRequest = () => axios.post(`/logout`)
// Función para verificar el token
// @ts-ignore
export const verifyToken = (token: string) => axios.get(`/verify`)
// Función para editar un usuario
export const editUser = (user: any) => axios.put(`/editar-usuario/${user.id}`, user)
// Función para cambiar la foto de perfil de un usuario
export const editUserImg = (userId: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file); // Asume que el servidor espera un campo 'image' para el archivo
  return axios.post(`/editar-imagen-usuario/${userId}`, formData);
};
// Función para obtener la imagen de un usuario
export const getUserImage = (userId: string) => axios.get(`/users/${userId}/image`)