import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.rooms'), href: '/habitaciones' },
    { name: t('navbar.services'), href: '/servicios' },
    { name: t('navbar.promotions'), href: '/promociones' },
    { name: t('navbar.gallery'), href: '/galeria' },
    { name: t('navbar.blog'), href: '/blog' },
    { name: t('navbar.contact'), href: '/contacto' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled 
          ? 'py-6' 
          : 'py-8'
      }`}
    >
      <div className={`mx-auto px-4 md:px-8 transition-all duration-700 ${
        scrolled ? 'max-w-7xl' : 'max-w-[95%]'
      }`}>
        <div className={`flex justify-between items-center gap-6 lg:gap-10 px-10 py-5 rounded-[2rem] transition-all duration-700 ${
          scrolled 
            ? 'glass shadow-premium' 
            : 'glass'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group mr-12">
            <span className="text-xl lg:text-2xl font-serif font-black tracking-tighter transition-all duration-500 text-primary-brown">
              La Posada <span className="text-primary-olive italic font-light">del Cerro</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-black transition-all duration-300 relative group text-[10px] uppercase tracking-[0.2em] text-black hover:text-primary-brown focus-visible:outline-2 focus-visible:outline-primary-olive focus-visible:outline-offset-2 rounded px-2 py-1`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-olive transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://wa.me/5492613433108?text=Hola!%20Quisiera%20consultar%20disponibilidad%20en%20La%20Posada%20del%20Cerro"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest transform hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center cursor-pointer ${
                  scrolled || !isHome
                    ? 'bg-primary-brown text-white hover:bg-primary-olive shadow-primary-brown/20'
                    : 'bg-white text-primary-brown hover:bg-primary-beige shadow-black/20'
                }`}
              >
                <Calendar className="w-3 h-3 mr-2" />
                {t('navbar.reserve')}
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors text-primary-brown"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-24 z-50 glass rounded-[2.5rem] overflow-hidden shadow-premium md:hidden"
          >
            <div className="px-8 py-10 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-primary-brown hover:text-primary-olive font-black uppercase text-sm tracking-[0.2em] transition-colors border-b border-primary-brown/10 pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/reserve"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary-brown text-white px-6 py-5 rounded-2xl font-black uppercase text-sm tracking-widest mt-8 shadow-xl"
              >
                {t('navbar.reserve')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
