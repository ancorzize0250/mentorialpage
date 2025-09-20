

const API_BASE_URL = import.meta.env.VITE_API_URL

const getConvocatorias = async () => {
    try {
        
        const response = await fetch(`${API_BASE_URL}/api/convocatoriasall`, {
        method: 'GET',
        });
        const data = await response.json();

        if (Array.isArray(data)) {
            return { success: true, convocatorias: data };
        } else {
            return { success: true, convocatorias: [data] };
        }
    } catch (error) {
        console.error("Error fetching convocatorias:", error);
        return { success: false, message: "Error al obtener las convocatorias." };
    }
};

export default getConvocatorias;