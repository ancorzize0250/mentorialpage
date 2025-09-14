

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-sm shadow-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Confirmación</h3>
        <p className="text-gray-300 text-center mb-6">
          ¿Ya has seleccionado las respuestas de la lista actual? Si continúas, la lista se limpiará y se cargarán nuevas preguntas.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onCancel}
            className="py-2 px-4 rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-700 transition duration-300"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="py-2 px-4 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition duration-300"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;