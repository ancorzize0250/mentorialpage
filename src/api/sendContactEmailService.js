
const API_BASE_URL = import.meta.env.VITE_API_URL

export const sendContactEmailService = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/correo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.status === 'success') {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || "Error desconocido" };
            }
        } else {
            return { success: false, message: data.message || "Hubo un error al enviar el correo" };
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        return { success: false, message: "Hubo un error de conexión con el servidor." };
    }
};

export default sendContactEmailService;