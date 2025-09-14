import  useLogin  from "../hooks/useLogin";
import Input from '../../../components/Input'; 
import Button from '../../../components/Button'; 



const LoginForm = ({ onLoginSuccess, onNavigateToRegister }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  } = useLogin(onLoginSuccess);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      handleLogin();
    }
  };

  return (
    <form className="bg-gray-900 rounded-2xl shadow-lg p-8 sm:p-10 w-full max-w-md" onSubmit={handleSubmit}>
      <img src="/mentoriallogo.png" alt="Mentorial Logo" className="w-40 h-40 mx-auto mb-0" />

      <h2 className="text-3xl font-bold text-center text-white mb-1">Iniciar Sesión</h2>
            
      <p className="text-gray-400 text-center mb-6">Bienvenido de nuevo.</p>
      
      {error && (
        <div className="bg-red-500 text-white font-bold p-3 rounded-lg text-center mb-4 transition-opacity duration-500">
          {error}
        </div>
      )}

      <Input
        label="Correo electrónico"
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
      </Button>

      <div className="mt-6 text-center">
        <p className="text-gray-400">¿Aún no tienes una cuenta?</p>
        <button
          type="button"
          onClick={onNavigateToRegister}
          className="text-purple-400 hover:text-purple-300 font-bold transition duration-300"
        >
          Abrir cuenta
        </button>
      </div>
    </form>
  );
};

export default LoginForm;