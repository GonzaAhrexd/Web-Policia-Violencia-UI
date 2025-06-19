import axios from '../axios'

// TERCERO
// Obtener tercero
export const getTercero = async (id: string) => {
    try {
        const response = await axios.get(`/terceros/tercero/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Crear tercero
export const crearTercero = async (tercero: any) => {
    try {
        const response = await axios.post(`/terceros/crear-tercero/`, tercero)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// Editar tercero
export const editarTercero = async (tercero: any) => {
    try {
        const response = await axios.put(`/terceros/editar-tercero/${tercero.tercero_id}`, tercero)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar tercero
export const eliminarTercero = async (id: string) => {
    try {
        const response = await axios.delete(`/terceros/eliminar-tercero/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Buscar tercero
export const buscarTercero = async (values: any) => {
    try {
        const response = await axios.get(`/terceros/buscar-tercero/${values.id_tercero ? values.id_tercero : "no_ingresado"}/${values.nombre_tercero ? values.nombre_tercero : "no_ingresado"}/${values.apellido_tercero ? values.apellido_tercero : "no_ingresado"}/${values.dni_tercero ? values.dni_tercero : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}