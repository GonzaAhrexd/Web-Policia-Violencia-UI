import axios from '../axios'

// VICTIMARIO

// POST: Buscar victimario array
export const getVictimariosArray = async (ids: string[]) => {
    try {
        const response = await axios.post(`/victimarios/array`, { victimariosIds: ids })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// POST: Agregar victimario
export const agregarVictimario = async (victimario: any) => {
    try {
        const response = await axios.post(`/victimarios/`, victimario)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// GET: Listar victimario
export const getVictimario = async (id: string) => {
    try {
        const response = await axios.get(`/victimarios/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// GET: Buscar victimario
export const buscarVictimario = async (values: any) => {
    try {
        const response = await axios.get(`/victimarios/${values.id_victimario ? values.id_victimario : "no_ingresado"}/${values.nombre_victimario ? values.nombre_victimario : "no_ingresado"}/${values.apellido_victimario ? values.apellido_victimario : "no_ingresado"}/${values.dni_victimario ? values.dni_victimario : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}



// PUT: Editar victimario
export const editarVictimario = async (victimario: any) => {
    try {
        const response = await axios.put(`/victimarios/${victimario.victimario_ID}`, victimario)
        return response.data
    } catch (error) {
        console.log(error)
    }
}