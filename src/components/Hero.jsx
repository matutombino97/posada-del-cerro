import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          alt="La Posada del Cerro Mendoza"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 to-primary-brown/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left px-6 md:px-16 lg:px-24 max-w-7xl w-full">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-serif font-black text-white mb-6 drop-shadow-2xl leading-tight"
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-4xl text-primary-beige/95 mb-12 font-light tracking-wide italic max-w-3xl"
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/habitaciones"
            className="inline-block bg-[#F4ECD8] text-primary-brown px-12 py-5 rounded-full text-xl font-black uppercase tracking-widest hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-2 transform active:scale-95 transition-all duration-500 cursor-pointer shadow-2xl"
          >
            {t('hero.cta')}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-1 h-12 rounded-full bg-white/20 flex justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
