import axios from '../axios'
// VÍCTIMA
// Agregar víctima
export const agregarVictima = async (victima: any) => {
    try {
        const response = await axios.post(`victimas/crear-victima/`, victima)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// Editar víctima
export const editarVictima = async (victima: any) => {
    try {
        const response = await axios.put(`victimas/editar-victima/${victima.victima_id}`, victima)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// Listar la Victima
export const getVictima = async (id: string) => {
    try {
        const response = await axios.get(`victimas/victima/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Buscar víctima
export const buscarVictima = async (values: any) => {
    try {
        const response = await axios.get(`victimas/buscar-victima/${values.id_victima ? values.id_victima : "no_ingresado"}/${values.nombre_victima ? values.nombre_victima : "no_ingresado"}/${values.apellido_victima ? values.apellido_victima : "no_ingresado"}/${values.dni_victima ? values.dni_victima : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getVictimasArray = async (ids: string[]) => {
    try {
        const response = await axios.post(`victimas/victimas-array`, { victimasIds: ids })
        return response.data
    } catch (error) {
        console.log(error)
    }
}