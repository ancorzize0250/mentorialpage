import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = ({ page, onLoginSuccess, onRegisterSuccess, onNavigateToLogin, onNavigateToRegister, successMessage }) => (
     <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      {successMessage && page === 'login' && (
          <div className="bg-green-500 text-white font-bold p-3 rounded-lg text-center mb-4 w-full max-w-md transition-opacity duration-500">
              {successMessage}
          </div>
      )}
      {page === 'login' && <LoginForm onLoginSuccess={onLoginSuccess} onNavigateToRegister={onNavigateToRegister} />}
      {page === 'register' && <RegisterForm onRegisterSuccess={onRegisterSuccess} onNavigateToLogin={onNavigateToLogin} />}
    </div>
);

export default LoginPage;