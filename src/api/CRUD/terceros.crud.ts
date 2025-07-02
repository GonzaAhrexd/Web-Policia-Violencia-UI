import axios from '../axios'

// TERCERO
// GET: Obtener tercero
export const getTercero = async (id: string) => {
    try {
        const response = await axios.get(`/terceros/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Buscar tercero
export const buscarTercero = async (values: any) => {
    try {
        const response = await axios.get(`/terceros/${values.id_tercero ? values.id_tercero : "no_ingresado"}/${values.nombre_tercero ? values.nombre_tercero : "no_ingresado"}/${values.apellido_tercero ? values.apellido_tercero : "no_ingresado"}/${values.dni_tercero ? values.dni_tercero : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// POST: Crear tercero
export const crearTercero = async (tercero: any) => {
    try {
        const response = await axios.post(`/terceros/`, tercero)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar tercero
export const editarTercero = async (tercero: any) => {
    try {
        const response = await axios.put(`/terceros/${tercero.tercero_id}`, tercero)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

