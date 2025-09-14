import { useState } from 'react';
import authService from '../../../api/authService'; 

const useRegister = (onRegisterSuccess) => {
    const [identificacion, setIdentificacion] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        setError(null);
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setIsLoading(true);

        const result = await authService.register(identificacion, nombres, apellidos, email, password);

        if (result.success) {
            onRegisterSuccess(result.message);
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    return {
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
    };
};

export default useRegister;