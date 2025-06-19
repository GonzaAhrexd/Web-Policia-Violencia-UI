import axios from '../axios'

type ValoresBusqueda = {
    numero_nota: string
    id_preventivo: string
    desde: Date,
    hasta: Date,
    division: string
    mostrar_ampliaciones: boolean
}

export const crearPreventivo = async (preventivo: any) => {
    try {
        axios.post(`/preventivo/crear-preventivo/`, preventivo)
    } catch (error) {
        console.log(error)
    }
}

export const buscarPreventivo = async (valores: ValoresBusqueda) => {
    try {
        const response = await axios.get(`/preventivo/buscar-preventivo/${valores.id_preventivo ? valores.id_preventivo : "no_ingresado"}/${valores.numero_nota ? valores.numero_nota : "no_ingresado"}/${valores.desde ? valores.desde : "no_ingresado"}/${valores.hasta ? valores.hasta : "no_ingresado"}/${valores.division ? valores.division : "no_ingresado"}/${valores.mostrar_ampliaciones ? valores.mostrar_ampliaciones : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editPreventivo = async (id: string, preventivo: any) => {
    try {
        const response = await axios.put(`/preventivo/editar-preventivo/${id}`, preventivo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deletePreventivo = async (id: string) => {
    try {
        const response = await axios.delete(`/preventivo/eliminar-preventivo/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getPreventivo = async (id: string) => {
    try {
        const response = await axios.get(`/preventivo/buscar-preventivo/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const ampliarPreventivo = async (preventivo: any) => {
    try {
        const response = await axios.post(`/preventivo/ampliar-preventivo`, preventivo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAmpliacionesPreventivo = async (id: string) => {
    try {
        const response = await axios.get(`/preventivo/buscar-ampliaciones-preventivo/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}