
const BASE_URL = import.meta.env.VITE_API_URL

export const getConvocatoriasByUsuario = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/convocatoriaxusuario?id_usuario=${userId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el historial de convocatorias');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching convocatorias:', error);
        throw error;
    }
};

export const getRespuestasByConvocatoria = async (userId, convocatoriaId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/historico?id_usuario=${userId}&id_convocatoria=${convocatoriaId}`);
        if (!response.ok) {
            throw new Error('No se pudieron obtener las respuestas de la convocatoria');
        }
        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error('Error fetching respuestas:', error);
        throw error;
    }
};