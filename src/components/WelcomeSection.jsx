import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto scroll-mt-24">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Column: Image with organic borders */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative z-10 w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-premium group">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
              alt="Bienvenidos a La Posada del Cerro" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-brown/40 to-transparent opacity-60" />
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-olive/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary-gold-glass rounded-full blur-2xl -z-10 opacity-50" />
        </motion.div>

        {/* Right Column: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:w-1/2 flex flex-col"
        >
          <span className="text-primary-olive font-black uppercase text-[10px] tracking-[0.4em] mb-6 block">
            {t('welcome.subtitle')}
          </span>
          
          <h2 className="text-5xl md:text-6xl font-serif text-primary-brown mb-8 leading-tight">
            {t('welcome.titlePrefix')} <span className="font-accent italic text-primary-olive">{t('welcome.titleSpan')}</span> {t('welcome.titleSuffix')}
          </h2>
          
          <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed mb-12">
            <p>
              {t('welcome.p1')}
            </p>
            <p>
              {t('welcome.p2')}
            </p>
          </div>

          {/* Contact Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-y border-primary-brown/5 py-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-primary-gold-glass flex items-center justify-center text-primary-olive shadow-sm">
                <Phone size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('welcome.callUs')}</span>
                <span className="text-sm font-bold text-primary-brown">+54 261 343 3108</span>
              </div>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-primary-gold-glass flex items-center justify-center text-primary-olive shadow-sm">
                <Mail size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('welcome.writeUs')}</span>
                <span className="text-sm font-bold text-primary-brown">info@laposadadelcerro.com</span>
              </div>
            </div>

            <div className="flex items-center gap-5 md:col-span-2">
              <div className="w-12 h-12 rounded-full bg-primary-gold-glass flex items-center justify-center text-primary-olive shadow-sm">
                <MapPin size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('welcome.visitUs')}</span>
                <span className="text-sm font-bold text-primary-brown">Av. del Cerro 1234, Luján de Cuyo, Mendoza</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a 
              href="https://wa.me/5492613433108?text=Hola!%20Quisiera%20consultar%20disponibilidad%20en%20La%20Posada%20del%20Cerro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-brown text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary-olive transition-all shadow-xl flex items-center justify-center group"
            >
              <Calendar size={14} className="mr-3" />
              {t('welcome.reserveWA')}
              <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </a>
            
            <a 
              href="mailto:info@laposadadelcerro.com?subject=Consulta%20de%20Disponibilidad" 
              className="bg-white border border-primary-brown text-primary-brown px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary-beige transition-all text-center"
            >
              {t('welcome.consultEmail')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
