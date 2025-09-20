// src/components/ConvocatoriaDetail.jsx

import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ConvocatoriaDetail = ({ convocatoria, onBack }) => {
    const { detail } = convocatoria;
    const { convocatoria: convoData, modulo, data } = detail;

    return (
        <div className="w-full max-w-3xl">
            <button
                onClick={onBack}
                className="py-2 px-4 rounded-lg font-bold text-white transition duration-300 bg-gray-600 hover:bg-gray-700 mb-6"
            >
                Volver
            </button>
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{convoData.nombre}</h3>
                <p className="text-gray-400 text-base mb-4">Módulo: {modulo.nombre}</p>

                {data.map((bloque) => (
                    <div key={bloque.encabezado.id_encabezado} className="mb-8">
                        {bloque.encabezado.encabezado && (
                            <p className="font-bold text-lg mb-4 text-purple-400">{bloque.encabezado.encabezado}</p>
                        )}
                        {bloque.preguntas.map((preguntaData) => (
                            <div key={preguntaData.pregunta.id_pregunta} className="bg-gray-800 p-4 rounded-lg mb-4">
                                <p className="font-semibold text-lg mb-2">{preguntaData.pregunta.pregunta}</p>
                                <ul className="space-y-2">
                                    {preguntaData.opciones.map((opcion) => (
                                        <li key={opcion.opcion} className="flex items-center">
                                            {opcion.opcion === preguntaData.respuesta_usuario ? (
                                                preguntaData.respuesta_usuario_correcta ? (
                                                    <FaCheckCircle className="text-green-500 mr-2" />
                                                ) : (
                                                    <FaTimesCircle className="text-red-500 mr-2" />
                                                )
                                            ) : (
                                                <div className="w-4 h-4 mr-2"></div> // Espaciador para alinear
                                            )}
                                            <span className={`${opcion.correcta ? 'font-bold text-green-400' : ''}`}>
                                                {opcion.opcion}) {opcion.descripcion_opcion}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConvocatoriaDetail;