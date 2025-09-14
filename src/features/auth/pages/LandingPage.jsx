import React, { useState } from 'react';
import { BookOpenCheck, DownloadCloud, MessageSquareText, Menu, Smartphone, Facebook, Twitter, Instagram, Linkedin, Rocket, Eye } from 'lucide-react';

const LandingPage = ({ onLoginClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-dark-bg text-gray-200 font-sans">
            {/* Encabezado y Navegación */}
            <header className="bg-dark-card/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-white">
                        <img src="/mentoriallogo.png" alt="Mentorial Logo" className="w-8 h-8" />
                        <span>Mentorial</span>
                    </a>

                    {/* Menú de Navegación (Escritorio) */}
                    <ul className="hidden md:flex items-center space-x-8">
                        <li><a href="#inicio" className="text-gray-300 hover:text-primary transition-colors">Inicio</a></li>
                        <li><a href="#cursos" className="text-gray-300 hover:text-primary transition-colors">Simulacros</a></li>
                        <li><a href="#mision" className="text-gray-300 hover:text-primary transition-colors">Misión</a></li>
                        <li><a href="#vision" className="text-gray-300 hover:text-primary transition-colors">Visión</a></li>
                        <li><a href="#contacto" className="text-gray-300 hover:text-primary transition-colors">Contacto</a></li>
                    </ul>

                    {/* Botones (Escritorio) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="https://github.com/ancorzize0250/MentorialAPP/releases/download/v1.0/mentorial.apk" download className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-transform hover:scale-105">
                            <DownloadCloud />
                            <span>Descargar App</span>
                        </a>
                        <a href="https://wa.me/3013587610" className="flex items-center space-x-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#20b85a] transition-transform hover:scale-105" aria-label="Contactar por WhatsApp">
                            <MessageSquareText size={20} />
                            <span>WhatsApp</span>
                        </a>
                        <button onClick={onLoginClick} className="flex items-center space-x-2 bg-white text-gray-800 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-transform hover:scale-105">
                            Login
                        </button>
                    </div>

                    {/* Botón de Menú (Móvil) */}
                    <button onClick={toggleMobileMenu} className="md:hidden text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                </nav>

                {/* Menú de Navegación (Móvil) */}
                <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col items-center p-4 space-y-4 bg-dark-card border-t border-gray-700`}>
                    <ul className="flex flex-col items-center p-4 space-y-4 w-full">
                        <li><a href="#inicio" className="text-gray-300 hover:text-primary">Inicio</a></li>
                        <li><a href="#cursos" className="text-gray-300 hover:text-primary">Simulacros</a></li>
                        <li><a href="#mision" className="text-gray-300 hover:text-primary">Misión</a></li>
                        <li><a href="#vision" className="text-gray-300 hover:text-primary">Visión</a></li>
                        <li><a href="#contacto" className="text-gray-300 hover:text-primary">Contacto</a></li>
                        <li className="w-full">
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                                <a href="https://github.com/ancorzize0250/MentorialAPP/releases/download/v1.0/mentorial.apk" className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-transform hover:scale-105 w-full text-center">
                                    <DownloadCloud />
                                    <span>Descargar App</span>
                                </a>
                                <a href="https://wa.me/3013587610" className="flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20b85a] transition-transform hover:scale-105 w-full text-center" aria-label="Contactar por WhatsApp">
                                    <MessageSquareText size={20} />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>

            {/* Contenido Principal */}
            <main>
                {/* Sección de Inicio (Hero) */}
                <section id="inicio" className="py-20 md:py-32">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Tu Futuro Profesional Comienza Aquí.</h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Potencia tu preparación con simulacros en línea de alta calidad creados por expertos, y da el siguiente paso para ganar tu concurso de mérito
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <button onClick={onLoginClick} className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-transform hover:scale-105 shadow-lg shadow-primary/20 w-full sm:w-auto">
                                Explorar Simulacros
                            </button>
                            <a href="https://github.com/ancorzize0250/MentorialAPP/releases/download/v1.0/mentorial.apk" className="bg-dark-card text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2">
                                <Smartphone />
                                <span>Descargar la App</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Sección de Cursos */}
                <section id="cursos" className="py-20 bg-dark-card">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Simulacros Populares</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Tarjeta de Curso 1 */}
                            <div className="bg-dark-bg rounded-lg border border-gray-700 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:border-primary">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Fiscal%C3%ADa_General_de_la_Naci%C3%B3n_%28Colombia%29_logo.svg" alt="Logo de la Fiscalía" className="w-full h-40 object-contain p-4" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">Fiscalía General de la Nación</h3>
                                    <p className="text-gray-400 mb-4">El concurso de la Fiscalía General de la Nación es un proceso de selección por mérito mediante el cual se convocan y evalúan aspirantes para ocupar cargos de carrera en la entidad. A través de pruebas de conocimientos, competencias y habilidades, se busca garantizar la transparencia y seleccionar a los mejores profesionales para fortalecer la administración de justicia en el país.</p>
                                    <a href="#" className="text-primary font-semibold hover:underline">Ver detalles del simulacro &rarr;</a>
                                </div>
                            </div>
                            {/* Tarjeta de Curso 2 */}
                            <div className="bg-dark-bg rounded-lg border border-gray-700 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:border-primary">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Contralor%C3%ADa_2.png" alt="Logo de la Contraloría" className="w-full h-40 object-contain p-4" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">Contraloría General de la República</h3>
                                    <p className="text-gray-400 mb-4">El concurso de la Contraloría General de la República es un proceso de selección por mérito que busca vincular a los mejores profesionales para fortalecer el control fiscal y la transparencia en la gestión pública del país.</p>
                                    <a href="#" className="text-primary font-semibold hover:underline">Ver detalles del simulacro &rarr;</a>
                                </div>
                            </div>
                            {/* Tarjeta de Curso 3 */}
                            <div className="bg-dark-bg rounded-lg border border-gray-700 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:border-primary">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Sena_Colombia_logo.svg" alt="Logo del SENA" className="w-full h-40 object-contain p-4" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">Servicio Nacional de aprendizaje</h3>
                                    <p className="text-gray-400 mb-4">El concurso del SENA es un proceso de mérito que selecciona a los mejores aspirantes para ocupar cargos de carrera en la entidad, fortaleciendo la formación profesional y el desarrollo del talento humano en Colombia.</p>
                                    <a href="#" className="text-primary font-semibold hover:underline">Ver detalles del simulacro &rarr;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección de Misión y Visión */}
                <section id="mision" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Misión */}
                            <div className="text-center md:text-left">
                                <div className="flex justify-center md:justify-start mb-4">
                                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                                        <Rocket className="w-8 h-8" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Nuestra Misión</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Brindar a los aspirantes a concursos de mérito en Colombia una plataforma web innovadora, accesible y confiable que ofrezca simulacros en línea de alta calidad, diseñados para fortalecer sus conocimientos, medir su nivel de preparación y aumentar sus posibilidades de éxito en procesos de entidades como la Fiscalía, la Contraloría, el SENA y demás instituciones públicas.
                                </p>
                            </div>
                            {/* Visión */}
                            <div id="vision" className="text-center md:text-left">
                                <div className="flex justify-center md:justify-start mb-4">
                                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                                        <Eye className="w-8 h-8" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Nuestra Visión</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Ser la plataforma líder en Colombia en preparación virtual para concursos de mérito, reconocida por la calidad de sus simulacros, el uso de tecnología educativa avanzada y el compromiso con el logro profesional de nuestros usuarios, contribuyendo a la formación de servidores públicos altamente capacitados.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección de Contacto */}
                <section id="contacto" className="py-20 bg-dark-card">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Ponte en Contacto</h2>
                        <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
                            ¿Tienes alguna pregunta o quieres colaborar con nosotros? Envíanos un mensaje y te responderemos lo antes posible.
                        </p>
                        <div className="max-w-xl mx-auto bg-dark-bg p-8 rounded-lg border border-gray-700">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">Nombre</label>
                                    <input type="text" id="name" name="name" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Tu nombre completo" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Correo Electrónico</label>
                                    <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="tu@email.com" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-gray-300 font-semibold mb-2">Mensaje</label>
                                    <textarea id="message" name="message" rows="5" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Escribe tu mensaje aquí..." required></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors w-full">
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* Pie de Página */}
            <footer className="bg-dark-bg border-t border-gray-700 py-12">
                <div className="container mx-auto px-6 text-center">
                    <a href="#" className="flex items-center justify-center space-x-2 text-2xl font-bold text-white mb-4">
                        <img src="/mentoriallogo.png" alt="Mentorial Logo" className="w-8 h-8" />
                        <span>Mentorial</span>
                    </a>
                    <p className="mb-6 text-gray-400">Transformando el aprendizaje, una habilidad a la vez.</p>
                    <div className="flex justify-center space-x-6 mb-8 text-gray-400">
                        <a href="#" className="hover:text-primary"><Facebook /></a>
                        <a href="#" className="hover:text-primary"><Twitter /></a>
                        <a href="#" className="hover:text-primary"><Instagram /></a>
                        <a href="#" className="hover:text-primary"><Linkedin /></a>
                    </div>
                    <p className="text-gray-500">&copy; 2025 Mentorial. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;