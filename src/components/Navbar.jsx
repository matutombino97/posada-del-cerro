import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('navbar.rooms'), href: '/habitaciones' },
    { name: t('navbar.services'), href: '/servicios' },
    { name: t('navbar.gallery'), href: '/galeria' },
    { name: t('navbar.blog'), href: '/blog' },
    { name: t('navbar.contact'), href: '/contacto' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary-brown/5 shadow-sm">
      <div className="w-full px-4 md:px-8 mx-auto">
        <div className="flex justify-between h-20 items-center gap-4">
          {/* Logo - Shifted more to the left */}
          <Link to="/" className="flex-shrink-0 flex items-center group pl-2">
            <span className="text-2xl md:text-3xl font-serif font-black text-primary-brown tracking-tighter group-hover:text-primary-olive transition-all duration-500 cursor-pointer">
              La Posada <span className="text-primary-olive group-hover:text-primary-brown italic transition-colors">del Cerro</span>
            </span>
          </Link>

          {/* Desktop Menu - Increased spacing */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 pr-2">
            <div className="flex items-center space-x-6 lg:space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-500 hover:text-primary-brown font-black transition-all duration-300 relative group whitespace-nowrap cursor-pointer text-[10px] lg:text-xs uppercase tracking-[0.2em]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-olive transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 lg:space-x-6">
              <button
                onClick={toggleLanguage}
                className="flex items-center text-primary-olive hover:text-primary-brown transition-all duration-300 uppercase font-black text-[10px] bg-primary-olive/5 hover:bg-primary-olive/10 px-4 py-2 rounded-full border border-primary-olive/10 cursor-pointer"
              >
                <Globe className="w-3 h-3 mr-2" />
                {i18n.language === 'es' ? 'EN' : 'ES'}
              </button>

              <Link
                to="/reserve"
                className="bg-primary-brown text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary-olive transform hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-primary-olive/20 flex items-center cursor-pointer"
              >
                <Calendar className="w-3 h-3 mr-2" />
                {t('navbar.reserve')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 pr-2">
             <button
              onClick={toggleLanguage}
              className="text-primary-olive font-black text-xs uppercase tracking-widest"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-brown hover:text-primary-olive transition-colors p-2"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-primary-brown hover:text-primary-olive font-black uppercase text-sm tracking-widest transition-colors border-b border-gray-50"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/reserve"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary-brown text-white px-6 py-5 rounded-2xl font-black uppercase text-sm tracking-widest mt-6 shadow-xl active:scale-95 transition-transform"
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
