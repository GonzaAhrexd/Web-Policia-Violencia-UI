import axios from '../axios'

export const crearRadiograma = async (radiograma: any) => {
    try {
        const response = await axios.post(`/radiograma/crear-radiograma`, radiograma)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getRadiogramaById = async (id: string) => {
    try {
        const response = await axios.get(`/radiograma/buscar-radiograma/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editRadiograma = async (id: string, radiograma: any) => {
    try {
        const response = await axios.put(`/radiograma/editar-radiograma/${id}`, radiograma)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const ampliarRadiograma = async (id_radiograma_original: string, id_radiograma_ampliado: string) => {
    try {
        const response = await axios.put(`/radiograma/ampliar-radiograma/${id_radiograma_original}/${id_radiograma_ampliado}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteRadiograma = async (id: string) => {
    try {
        const response = await axios.delete(`/radiograma/eliminar-radiograma/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}