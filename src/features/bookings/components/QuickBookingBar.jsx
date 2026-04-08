import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickBookingBar = ({ roomName = "" }) => {
  const { t } = useTranslation();
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync checkIn and checkOut: if checkIn changes and becomes >= checkOut, clear checkOut
  useEffect(() => {
    if (dates.checkIn && dates.checkOut && dates.checkIn >= dates.checkOut) {
      setDates(prev => ({ ...prev, checkOut: '' }));
    }
  }, [dates.checkIn, dates.checkOut]);

  const waMessage = `Hola!%20Quisiera%20reservar%20${roomName ? `la%20${roomName}%20` : ''}en%20La%20Posada%20del%20Cerro${dates.checkIn ? `%0ACheck-in:%20${dates.checkIn}` : ''}${dates.checkOut ? `%0ACheck-out:%20${dates.checkOut}` : ''}`;

  const handleToggle = (e) => {
    if (isMobile && !isExpanded) {
      e.preventDefault();
      setIsExpanded(true);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-4 md:bottom-8 left-0 right-0 z-40 px-4 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto w-full pointer-events-auto">
        <div className="glass shadow-premium rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-8 border border-white/40 overflow-hidden">
          <AnimatePresence>
            {(isExpanded || !isMobile) && (
              <motion.div 
                initial={isMobile ? { height: 0, opacity: 0 } : {}}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex-grow w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full py-2 md:py-0">
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-[1.5rem] bg-white/30 border border-white/20">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-olive" />
                    <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Llegada</span>
                        <input 
                          type="date" 
                          value={dates.checkIn}
                          onChange={(e) => setDates({...dates, checkIn: e.target.value})}
                          className="bg-transparent text-[10px] md:text-xs font-bold text-primary-brown focus:outline-none" 
                        />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-[1.5rem] bg-white/30 border border-white/20">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-olive" />
                    <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Salida</span>
                        <input 
                          type="date" 
                          value={dates.checkOut}
                          min={dates.checkIn}
                          onChange={(e) => setDates({...dates, checkOut: e.target.value})}
                          className="bg-transparent text-[10px] md:text-xs font-bold text-primary-brown focus:outline-none" 
                        />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-[1.5rem] bg-white/30 border border-white/20">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-primary-olive" />
                    <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Personas</span>
                        <select className="bg-transparent text-[10px] md:text-xs font-bold text-primary-brown focus:outline-none cursor-pointer">
                          <option>2 Adultos</option>
                          <option>1 Adulto</option>
                          <option>3 Adultos</option>
                          <option>4+ Adultos</option>
                        </select>
                    </div>
                  </div>
                </div>
                {isMobile && (
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="absolute top-3 right-4 text-primary-brown/40 p-1"
                  >
                    <X size={20} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <a 
            href={`https://wa.me/5492613433108?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleToggle}
            className="bg-primary-brown text-white h-12 md:h-16 w-full md:w-auto px-8 md:px-10 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-primary-olive transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
          >
            {isExpanded || !isMobile ? t('navbar.reserve') : 'Reservar Ahora'} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickBookingBar;
