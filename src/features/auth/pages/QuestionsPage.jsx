import { useState, useEffect } from "react";
import Button from '../../../components/Button';
import useQuestions from '../hooks/useQuestions';
import ConfirmationModal from '../../../components/ConfirmationModal';
import preguntaService from '../../../api/preguntaService'; 


const QuestionsPage = ({ user, onLogout, selectedConvocatoria, onNavigateBack }) => {
    
    const { questionsData, isLoading, error, hasMoreQuestions, getQuestions } = useQuestions(selectedConvocatoria?.id, user?.id, selectedConvocatoria?.ultima_pregunta);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [verificationStatus, setVerificationStatus] = useState({});
    const [isVerified, setIsVerified] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [validationMessage, setValidationMessage] = useState(null);
console.log('error: ');console.log(error);
    const questionsArray = questionsData?.data || [];
    const totalQuestions = questionsArray.reduce((count, item) => count + item.preguntas.length, 0);
    const allQuestionsAnswered = Object.keys(selectedAnswers).length === totalQuestions;


    const handleAnswerChange = (questionKey, option) => {
        if (!isVerified) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionKey]: option,
            });
        }
    };

    const handleVerifyClick = () => {
        const results = {};
        questionsArray.forEach(item => {
            item.preguntas.forEach(preguntaItem => {
                const questionKey = preguntaItem.pregunta.id_pregunta;
                const selectedOption = selectedAnswers[questionKey];
                if (selectedOption) {
                    results[questionKey] = selectedOption.correcta;
                } else {
                    results[questionKey] = false;
                }
            });
        });
        setVerificationStatus(results);
        setIsVerified(true);
    };

    const handleRetryClick = () => {
        setSelectedAnswers({});
        setVerificationStatus({});
        setIsVerified(false);
        setApiErrorMessage(null);
        setValidationMessage(null);
    };

    const handleLoadNextQuestions = async () => {
        setApiErrorMessage(null); // Clear any previous error message
        setValidationMessage(null);

        if (!allQuestionsAnswered) {
            setValidationMessage("Por favor, responde a todas las preguntas antes de continuar.");
            return;
        }

        // 1. Preparar datos para la solicitud POST
        const answersToSubmit = [];
        questionsArray.forEach(item => {
            item.preguntas.forEach(preguntaItem => {
                const questionId = preguntaItem.pregunta.id_pregunta;
                const selectedOption = selectedAnswers[questionId];
                if (selectedOption) {
                    const isCorrect = selectedOption.correcta;
                    answersToSubmit.push({
                        id_pregunta: questionId,
                        id_usuario: user.id,
                        opcion: selectedOption.opcion,
                        descripcion_opcion: selectedOption.descripcion_opcion,
                        correcta: isCorrect
                    });
                }
            });
        });

        // 2. Enviar respuestas solo si hay respuestas para enviar
        if (answersToSubmit.length > 0) {
        
            const result = await preguntaService.submitAnswers(answersToSubmit);

            if (result.success) {
                // Si es exitoso, carga las siguientes preguntas y resetea el estado
                getQuestions(true);
                setSelectedAnswers({});
                setVerificationStatus({});
                setIsVerified(false);
            } else {
                // Si falla, muestra el mensaje de error de la API
                console.error("Error al enviar las respuestas:", result.message);
                setApiErrorMessage(result.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center p-4 text-white">
            <header className="w-full bg-gray-900 shadow-md py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between rounded-b-xl mb-6 md:mb-8">
                <h1 className="text-lg font-bold mb-2 md:mb-0">
                    Bienvenido, {user.nombres}
                </h1>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <button
                        onClick={onNavigateBack}
                        className="py-2 px-4 rounded-lg font-bold text-white transition duration-300 bg-gray-600 hover:bg-gray-700 w-full md:w-auto text-sm"
                    >
                        Volver
                    </button>
                    <button
                        onClick={onLogout}
                        className="py-2 px-4 rounded-lg font-bold text-white transition duration-300 bg-red-600 hover:bg-red-700 w-full md:w-auto text-sm"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg p-4 md:p-8">
                {isLoading && questionsArray.length === 0 && (
                    <p className="text-center text-gray-400 text-sm">Cargando preguntas...</p>
                )}
                
                {(apiErrorMessage || validationMessage || error) && (
                    <div className="bg-red-800 text-white p-3 rounded-lg text-center mb-4">
                        <p>{apiErrorMessage || validationMessage || error}</p>
                    </div>
                )}

                {questionsData && (
                    <>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">{questionsData?.convocatoria?.nombre}</h2>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-purple-400 mb-4 md:mb-6">{questionsData?.modulo?.nombre}</h3>

                        {/* MODIFICACIÓN: Se añade la condición `hasMoreQuestions` para renderizar las preguntas */}
                        {hasMoreQuestions && questionsArray.length > 0 ? (
                            questionsArray.map((item, index) => (
                                <div key={index} className="mb-6 p-4 md:p-6 bg-gray-800 rounded-lg">
                                    <p className="font-bold text-base sm:text-lg mb-4 text-gray-300">{item.encabezado.encabezado}</p>

                                    <div className="space-y-4">
                                        {item.preguntas.map((preguntaItem, preguntaIndex) => {
                                            const questionKey = preguntaItem.pregunta.id_pregunta;

                                            return (
                                                <div key={preguntaIndex} className="bg-gray-700 p-3 md:p-4 rounded-lg">
                                                    <p className="text-base sm:text-lg font-bold text-white mb-2">
                                                        {preguntaItem.pregunta.pregunta}
                                                    </p>
                                                    <div className="space-y-2">
                                                        {preguntaItem.opciones.map((opcion, i) => (
                                                            <div key={i} className="flex items-center space-x-2">
                                                                <input
                                                                    type="radio"
                                                                    id={`opcion-${questionKey}-${i}`}
                                                                    name={`pregunta-${questionKey}`}
                                                                    value={opcion.opcion}
                                                                    checked={selectedAnswers[questionKey]?.opcion === opcion.opcion}
                                                                    onChange={() => handleAnswerChange(questionKey, opcion)}
                                                                    className="form-radio text-purple-600"
                                                                />
                                                                <label
                                                                    htmlFor={`opcion-${questionKey}-${i}`}
                                                                    className="text-gray-300 text-sm sm:text-base"
                                                                >
                                                                    {opcion.descripcion_opcion}
                                                                </label>
                                                                {isVerified && (
                                                                    <span className="ml-2">
                                                                    {selectedAnswers[questionKey]?.opcion === opcion.opcion && verificationStatus[questionKey] === true && (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                    </svg>
                                                                    )}
                                                                    {selectedAnswers[questionKey]?.opcion === opcion.opcion && verificationStatus[questionKey] === false && (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                                    </svg>
                                                                    )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 mt-4 text-sm">No se encontraron preguntas para esta convocatoria.</p>
                        )}
                        
                        {/* MODIFICACIÓN: Se elimina el `questionsArray.length > 0` para mostrar solo el mensaje */}
                        {!hasMoreQuestions && (
                            <p className="text-center text-gray-400 mt-6 text-sm">Has llegado al final. No hay más preguntas.</p>
                        )}

                        {isLoading && questionsArray.length > 0 && (
                            <p className="text-center text-gray-400 text-sm mt-6">Cargando más preguntas...</p>
                        )}
                        
                        {/* Se mantiene la sección de botones */}
                        {hasMoreQuestions && !isLoading && (
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                                {isVerified ? (
                                    <Button onClick={handleRetryClick} className="bg-orange-500 hover:bg-orange-600">
                                        Reintentar
                                    </Button>
                                ) : (
                                    <Button onClick={handleVerifyClick} disabled={Object.keys(selectedAnswers).length === 0}>
                                        Verificar
                                    </Button>
                                )}
                                <Button
                                    onClick={handleLoadNextQuestions}
                                    disabled={!allQuestionsAnswered}
                                    className={`${!allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'}`}
                                >
                                    Cargar Más Preguntas
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default QuestionsPage;

