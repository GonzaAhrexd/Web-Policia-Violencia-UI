import axios from '../axios'

// VICTIMARIO
// Agregar victimario
export const agregarVictimario = async (victimario: any) => {
    try {
        const response = await axios.post(`/victimarios/crear-victimario/`, victimario)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// Listar victimario
export const getVictimario = async (id: string) => {
    try {
        const response = await axios.get(`/victimarios/victimario/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar victimario
export const editarVictimario = async (victimario: any) => {
    try {
        const response = await axios.put(`/victimarios/editar-victimario/${victimario.victimario_ID}`, victimario)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// Buscar victimario
export const buscarVictimario = async (values: any) => {
    try {
        const response = await axios.get(`/victimarios/buscar-victimario/${values.id_victimario ? values.id_victimario : "no_ingresado"}/${values.nombre_victimario ? values.nombre_victimario : "no_ingresado"}/${values.apellido_victimario ? values.apellido_victimario : "no_ingresado"}/${values.dni_victimario ? values.dni_victimario : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getVictimariosArray = async (ids: string[]) => {
    try {
        const response = await axios.post(`/victimarios/victimarios-array`, { victimariosIds: ids })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
