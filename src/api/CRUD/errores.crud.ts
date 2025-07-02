import axios from '../axios'


// POST: Reportar errores
export const reportarErrores = async (values: any) => {
    try {
        const response = await axios.post(`/errores/`, values)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

