import axios from '../axios'

// Funciones CRUD para los campos de la base de datos

// Agregar un campo
export const agregarCampo = async (campo: any) => {
    try {
        const response = await axios.post('/campos/agregar-campo', campo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Listar todos los campos
export const obtenerCampo = async (tipo: string) => {
    try {
        const response = await axios.get(`/campos/obtener-campo/${tipo}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar un campo
export const editarCampo = async (campo: any) => {
    try {
        const response = await axios.put(`/campos/editar-campo/${campo._id}`, campo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar un campo
export const eliminarCampo = async (id: string) => {
    try {
        const response = await axios.delete(`/campos/eliminar-campo/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
