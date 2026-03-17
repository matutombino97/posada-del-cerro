import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-brown text-[#FDFBF7] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-serif font-black mb-8">La Posada <br /> <span className="text-primary-olive/80 italic">del Cerro</span></h2>
            <p className="text-primary-beige/60 text-sm leading-relaxed font-light italic">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-primary-olive">{t('gallery.all')}</h3>
            <ul className="space-y-5 text-sm font-semibold text-primary-beige/70">
              <li><Link to="/" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{t('navbar.home') || 'Inicio'}</Link></li>
              <li><Link to="/habitaciones" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{t('navbar.rooms')}</Link></li>
              <li><Link to="/galeria" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{t('navbar.gallery')}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{t('navbar.blog')}</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{t('navbar.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-primary-olive">{t('navbar.contact')}</h3>
            <ul className="space-y-6 text-sm text-primary-beige/70">
              <li className="flex items-center group cursor-pointer hover:text-white transition-all">
                <MapPin className="w-4 h-4 mr-4 text-primary-olive group-hover:scale-125 transition-transform" /> 
                <span className="font-light">Luján de Cuyo, Mendoza</span>
              </li>
              <li className="flex items-center group cursor-pointer hover:text-white transition-all">
                <Phone className="w-4 h-4 mr-4 text-primary-olive group-hover:scale-125 transition-transform" /> 
                <span className="font-light">+54 261 123 4567</span>
              </li>
              <li className="flex items-center group cursor-pointer hover:text-white transition-all">
                <Mail className="w-4 h-4 mr-4 text-primary-olive group-hover:scale-125 transition-transform" /> 
                <span className="font-light">info@laposadadelcerro.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-primary-olive">Social</h3>
            <div className="flex space-x-6 mb-12">
              <a href="#" className="bg-white/5 p-4 rounded-3xl hover:bg-primary-olive hover:text-white transition-all duration-500 shadow-xl border border-white/5"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="bg-white/5 p-4 rounded-3xl hover:bg-primary-olive hover:text-white transition-all duration-500 shadow-xl border border-white/5"><Facebook className="w-5 h-5" /></a>
            </div>
            <p className="text-[10px] text-primary-beige/30 uppercase font-black tracking-widest leading-loose">
              Síguenos para descubrir <br /> promociones exclusivas.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-primary-beige/20 font-black uppercase tracking-[0.3em]">
          <p>© 2026 La Posada del Cerro.</p>
          <p className="mt-4 md:mt-0">
            Design & Code by <span className="text-primary-olive/50">Matias Sosa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
