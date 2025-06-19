import axios from '../axios'

// DENUNCIAS SIN VERIFICAR
export const crearDenunciaSinVerificar = async (denuncia: any) => {
    try {
        const response:any = await axios.post(`/denuncias-sin-verificar/crear-denuncia-sin-verificar/`, denuncia)
        console.log(response.data)
        return response.data 
    } catch (error) {
        console.log(error)
    }
}

// Mostrar todas las denuncias pendietnes de validación
export const mostrarDenunciasSinVerificar = async () => {
    try {
        const response = await axios.get(`/denuncias-sin-verificar/denuncias-sin-verificar/`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const mostrarDenunciasSinVerificarID = async (id: string) => {
    try {
        const response = await axios.get(`/denuncias-sin-verificar/buscar-denuncias-sin-verificar-por-id/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


// Rechazar denuncia
export const eliminarDenunciaSinVerificar = async (id: string) => {
    try {
        const response = await axios.delete(`/denuncias-sin-verificar/eliminar-denuncias-sin-verificar/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

// Aprobar denuncia
export const aprobarDenuncia = async (id: string) => {
    try {
        const response = await axios.put(`/denuncias-sin-verificar/validar-denuncia/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

// Ver denuncias sin verificar del usuario actual
export const misDenunciasSinVerificar = async (values: any) => {
    try {
        const response = await axios.get(`/denuncias-sin-verificar/mis-denuncias-sin-verificar/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const buscarDenunciasSinVerificar = async (values: any) => {
    try {
        const response = await axios.get(`/denuncias-sin-verificar/buscar-denuncias-sin-verificar/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_denuncia ? encodeURIComponent(values.id_denuncia) : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.division ? values.division : "no_ingresado"}/${values.municipio ? values.municipio : "no_ingresado"}/${values.comisaria ? values.comisaria : "no_ingresado"}/${values.mostrar_ampliaciones ? values.mostrar_ampliaciones : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const buscarAmpliaciones = async (id: any) => {
    try {
        const response = await axios.get(`/denuncias-sin-verificar/buscar-ampliaciones/${id}`, )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const agregarAmpliacionDenuncia = async (id: string, idAmpliacion: string) => {
    try {
        const response = await axios.put(`/denuncias-sin-verificar/agregar-ampliacion/${id}/${idAmpliacion}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
