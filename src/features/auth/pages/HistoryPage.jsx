import React, { useState, useEffect } from 'react';
import { getConvocatoriasByUsuario, getRespuestasByConvocatoria, deleteHistorial } from '../../../api/historialService';
import ConvocatoriaDetail from '../../../components/ConvocatoriaDetail'; 
import Button from '../../../components/Button'; 

const HistoryPage = ({ user }) => {
    const [convocatorias, setConvocatorias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedConvocatoria, setSelectedConvocatoria] = useState(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    useEffect(() => {
        const fetchConvocatorias = async () => {
            setIsLoading(true);
            setMessage('');
            try {
                const data = await getConvocatoriasByUsuario(user.id);
                if (data.length === 0) {
                    setMessage('No tienes convocatorias en tu historial.');
                }
                setConvocatorias(data);
            } catch (error) {
                setMessage('Error al cargar el historial.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConvocatorias();
    }, [user.id]);

    const handleConvocatoriaClick = async (convocatoria) => {
        setIsLoading(true);
        setMessage('');
        try {
            const data = await getRespuestasByConvocatoria(user.id, convocatoria.id_convocatoria);
            setSelectedConvocatoria({ ...convocatoria, detail: data });
        } catch (error) {
            setMessage('Error al cargar los detalles de la convocatoria.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackClick = () => {
        setSelectedConvocatoria(null);
        setMessage('');
    };

    const handleConfirmDelete = () => {
        // Establece el estado para mostrar el popup de confirmación
        setIsConfirmingDelete(true);
    };

    const handleCancelDelete = () => {
        setIsConfirmingDelete(false);
    };

    const handleFinalDelete = async () => {
        setIsConfirmingDelete(false);
        setIsLoading(true);
        try {;
            const response = await deleteHistorial(user.id, selectedConvocatoria.id_convocatoria);
            
            if (response.status === 'success') {
                setMessage(response.message);
                // Filtra la convocatoria eliminada de la lista
                setConvocatorias(prev => prev.filter(c => c.id_convocatoria !== selectedConvocatoria.id_convocatoria));
                // Vuelve a la lista después de la eliminación exitosa
                setSelectedConvocatoria(null);
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('Error al eliminar el historial.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-400 text-sm">Cargando...</p>;
    }

    if (message && !convocatorias.length && !selectedConvocatoria) {
         return <p className="text-center text-red-400 text-sm">{message}</p>;
    }

    // Muestra el detalle si se ha seleccionado una convocatoria
     if (selectedConvocatoria) {
        return (
            <>
                <ConvocatoriaDetail 
                    convocatoria={selectedConvocatoria} 
                    onBack={handleBackClick} 
                    onDelete={handleConfirmDelete} // Pasa el handler de eliminación
                />
                {/* Popup de confirmación */}
                {isConfirmingDelete && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                            <p className="text-white font-bold mb-4">
                                Esto eliminará sus respuestas y deberá empezar el simulacro desde cero, ¿desea continuar?
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button onClick={handleFinalDelete} className="bg-red-600 hover:bg-red-700">
                                    Sí, continuar
                                </Button>
                                <Button onClick={handleCancelDelete} className="bg-gray-600 hover:bg-gray-700">
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // Muestra la lista de convocatorias
    return (
        <div className="w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4 text-center">Historial de Convocatorias</h3>
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-lg">
                <ul className="space-y-4">
                    {convocatorias.map((convocatoria) => (
                        <li
                            key={convocatoria.id_convocatoria}
                            className="bg-gray-800 p-3 sm:p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
                            onClick={() => handleConvocatoriaClick(convocatoria)}
                        >
                            <p className="text-purple-400 font-bold text-base sm:text-lg mb-1">{convocatoria.codigo_convocatoria}</p>
                            <p className="text-gray-300 text-sm">{convocatoria.nombre_convocatoria}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HistoryPage;