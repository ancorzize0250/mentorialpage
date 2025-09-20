import IconButton from '../../../components/IconButton'; 
import Input from '../../../components/Input'; 
import Button  from '../../../components/Button'; 
import useRegister from '../hooks/useRegister';

const RegisterForm = ({ onRegisterSuccess, onNavigateToLogin }) => {
    const {
        identificacion,
        setIdentificacion,
        nombres,
        setNombres,
        apellidos,
        setApellidos,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        error,
        handleRegister
    } = useRegister(onRegisterSuccess);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoading) {
            handleRegister();
        }
    };

    return (
        <form className="bg-gray-900 rounded-2xl shadow-lg p-8 sm:p-10 w-full max-w-md relative" onSubmit={handleSubmit}>
            <IconButton onClick={onNavigateToLogin} />
            <h2 className="text-3xl font-bold text-center text-white mb-6">Crear Cuenta</h2>
            
            {error && (
                <div className="bg-red-500 text-white font-bold p-3 rounded-lg text-center mb-4 transition-opacity duration-500">
                    {error}
                </div>
            )}

            <Input
                label="Identificación"
                type="text"
                placeholder="Ingresa tu identificación"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
            />
            <Input
                label="Nombres"
                type="text"
                placeholder="Ingresa tus nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
            />
            <Input
                label="Apellidos"
                type="text"
                placeholder="Ingresa tus apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
            />
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
            <Input
                label="Repetir Contraseña"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="mt-6">
                <Button onClick={handleRegister} disabled={isLoading}>
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;