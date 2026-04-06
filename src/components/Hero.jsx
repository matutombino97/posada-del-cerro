import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StructuredData, hotelSchema } from './StructuredData';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      <StructuredData data={hotelSchema} />
      
      {/* Hero Background with Video & Ken Burns */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover animate-kenburns shadow-inner"
          poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070"
          aria-label="Video de fondo: lujo hostal con piscina y palmeras al atardecer"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-a-pool-and-palm-trees-at-sunset-1205-large.mp4" type="video/mp4" />
          <p>Tu navegador no soporta videos HTML5. Considera actualizar tu navegador.</p>
        </video>
        {/* Subtle gradient overlay - stronger on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left px-6 md:px-16 lg:px-24 max-w-7xl w-full">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
         >
            <span className="text-primary-beige font-black uppercase text-[10px] tracking-[0.5em] mb-6 block opacity-80">
               {t('hero.welcome')}
            </span>
         </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[10rem] font-serif font-black text-white mb-4 drop-shadow-2xl leading-[0.9] tracking-tighter"
        >
          {t('hero.title').split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? "font-accent italic font-light text-primary-beige" : ""}>
              {word}{' '}
            </span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white mb-8 font-bold tracking-wide italic max-w-2xl border-l-4 border-primary-olive pl-8 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="flex flex-col md:flex-row gap-6 items-start"
        >
          <Link
            to="/habitaciones"
            className="group relative inline-block bg-primary-beige text-primary-brown px-14 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className="absolute inset-0 bg-primary-olive translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               {t('hero.cta')}
            </span>
          </Link>
          
          <div className="flex items-center gap-4 text-white/80 py-6">
             <div className="w-12 h-px bg-white/30" />
             <span className="text-[10px] font-bold uppercase tracking-widest">{t('hero.experience')}</span>
          </div>
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
