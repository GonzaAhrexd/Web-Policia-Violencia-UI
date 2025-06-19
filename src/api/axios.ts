// Importamos axios
import axios from 'axios'
// Obtenemos la URL base de las variables de entorno
const baseUrl = import.meta.env.VITE_BASE_URL
// Creamos una instancia de axios con la URL base
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})
// Exportamos la instancia
export default instance