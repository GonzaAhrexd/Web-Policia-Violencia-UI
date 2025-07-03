import axios from '../axios'

// POST: Crear radiograma
export const crearRadiograma = async (radiograma: any) => {
    try {
        const response = await axios.post(`/radiograma/`, radiograma)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Buscar radiogramas
export const getRadiogramaById = async (id: string) => {
    try {
        const response = await axios.get(`/radiograma/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar radiograma

export const editRadiograma = async (id: string, radiograma: any) => {
    try {
        const response = await axios.put(`/radiograma/${id}`, radiograma)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Ampliar radiograma
export const ampliarRadiograma = async (id_radiograma_original: string, id_radiograma_ampliado: string) => {
    try {
        const response = await axios.put(`/radiograma/ampliar-radiograma/${id_radiograma_original}/${id_radiograma_ampliado}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// DELETE: Eliminar radiograma
export const deleteRadiograma = async (id: string) => {
    try {
        const response = await axios.delete(`/radiograma/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}