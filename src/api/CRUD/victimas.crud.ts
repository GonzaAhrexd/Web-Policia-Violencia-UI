import axios from '../axios'
// VÍCTIMA
// POST: Agregar víctima
export const agregarVictima = async (victima: any) => {
    try {
        const response = await axios.post(`victimas/`, victima)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}
// POST: Victimas con Array de Ids
export const getVictimasArray = async (ids: string[]) => {
    try {
        const response = await axios.post(`victimas/array`, { victimasIds: ids })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


// GET: Listar la Victima
export const getVictima = async (id: string) => {
    try {
        const response = await axios.get(`victimas/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Buscar víctima
export const buscarVictima = async (values: any) => {
    try {
        const response = await axios.get(`victimas/${values.id_victima ? values.id_victima : "no_ingresado"}/${values.nombre_victima ? values.nombre_victima : "no_ingresado"}/${values.apellido_victima ? values.apellido_victima : "no_ingresado"}/${values.dni_victima ? values.dni_victima : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar víctima
export const editarVictima = async (victima: any) => {
    try {
        const response = await axios.put(`victimas/${victima.victima_id}`, victima)
        return response.data
    } catch (error) {
        console.log(error)
    }
}