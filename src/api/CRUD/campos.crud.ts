import axios from '../axios'

// Funciones CRUD para los campos de la base de datos

// POST: Agregar un campo
export const agregarCampo = async (campo: any) => {
    try {
        const response = await axios.post('/campos/', campo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Listar todos los campos
export const obtenerCampo = async (tipo: string) => {
    try {
        const response = await axios.get(`/campos/${tipo}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar un campo
export const editarCampo = async (campo: any) => {
    try {
        const response = await axios.put(`/campos/${campo._id}`, campo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// DELETE: Eliminar un campo
export const eliminarCampo = async (id: string) => {
    try {
        const response = await axios.delete(`/campos/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
