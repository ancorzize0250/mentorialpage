const API_BASE_URL = import.meta.env.VITE_API_URL

const getConvocatorias = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/convocatoriasall`, {
            method: 'GET',
        });

        // Paso 1: Verificar explícitamente si la respuesta fue exitosa (código 2xx)
        if (!response.ok) {
            const errorText = await response.text(); // o response.json() si esperas un JSON de error
            console.error('Error en la respuesta del servidor:', response.status, errorText);
            return { 
                success: false, 
                message: `Error del servidor: ${response.status} - ${response.statusText}` 
            };
        }

        const data = await response.json();

        // Paso 2: La lógica original para manejar el formato de los datos
        if (Array.isArray(data)) {
            return { success: true, convocatorias: data };
        } else {
            // Esto maneja el caso donde la API devuelve un solo objeto en lugar de un array
            return { success: true, convocatorias: [data] };
        }

    } catch (error) {
        // Este bloque solo se ejecutará para errores de red genuinos o CORS.
        console.error("Error al obtener las convocatorias:", error);
        return { success: false, message: "Error al obtener las convocatorias. Por favor, revisa tu conexión." };
    }
};

export default getConvocatorias;