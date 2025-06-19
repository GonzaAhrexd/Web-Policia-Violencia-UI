import axios from '../axios'

// Agregar unidad
export const agregarUnidad = async (unidad: any) => {
    try {
        const response = await axios.post('/unidades/agregar-unidad', unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Obtener unidades
export const obtenerUnidades = async () => {
    try {
        const response = await axios.get('/unidades/mostrar-unidades')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar unidades
export const editarUnidad = async (unidad: any) => {
    try {
        const response = await axios.put(`/unidades/editar-unidad/${unidad.id}`, unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Agregar municipio
export const agregarMunicipio = async (unidad: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-municipio/${unidad.id}`, unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar municipio
export const editarMunicipio = async (municipio: any) => {
    try {
        const response = await axios.put(`/unidades/editar-municipio/`, municipio)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Agregar comisaria
export const agregarComisaria = async (comisaria: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-comisaria/`, comisaria)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar comisaría
export const editarComisaria = async (comisaria: any) => {
    try {
        const response = await axios.put(`/unidades/editar-comisaria/`, comisaria)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar cuadricula desde comisaria
export const eliminarCuadriculaDesdeComisaria = async (cuadricula: string, comisaria: string, municipio: string ) => {
    try {
        const response = await axios.put(`/unidades/eliminar-cuadricula/${cuadricula}/${comisaria}/${municipio}`,)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Agregar cuadricula
export const agregarCuadricula = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-cuadricula/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar cuadricula
export const editarCuadriculaDesdeComisaria = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/editar-cuadricula-desde-comisaria/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar municipio
export const eliminarMunicipio = async (nombre: any) => {
    try {
        const response = await axios.put(`/unidades/eliminar-municipio/${nombre}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar comisaria
export const eliminarComisaria = async (nombre: any, municipio: any) => {
    try {
        const response = await axios.put(`/unidades/eliminar-comisaria/${nombre}/${municipio}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Agregar cuadricula desde municipio
export const agregarCuadriculaDesdeMunicipio = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-cuadricula-desde-municipio/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar cuadricula desde municipio
export const editarCuadriculaDesdeMunicipio = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/editar-cuadricula-desde-municipio/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar cuadricula desde municipio
export const eliminarCuadriculaDesdeMunicipio = async (cuadricula: string, municipio: string ) => {
    try{
        const response = await axios.put(`/unidades/eliminar-cuadricula-desde-municipio/${cuadricula}/${municipio}`,)
        return response.data
    } catch (error) {
        console.log(error)
    }
}