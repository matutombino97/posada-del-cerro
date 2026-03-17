import { motion } from 'framer-motion';
import { Waves, Mountain, Camera, Martini, MapPin, Clock, Star, ArrowUpRight } from 'lucide-react';

const EventsPage = () => {
  const events = [
    {
      title: "Pool Day & Sunset Malbec",
      category: "Experiencia Posada",
      description: "Día completo de acceso a nuestra piscina climatizada con almuerzo regional y degustación de vinos mendocinos frente a la Cordillera.",
      time: "10:00 - 20:30",
      price: "$45 USD",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
      tag: "Disponible Diario"
    },
    {
      title: "Cabalgata al Atardecer",
      category: "Naturaleza",
      description: "Recorrido guiado por cerros locales finalizando con brindis en la cima. Captura las mejores fotos de Mendoza bañada en oro.",
      time: "17:00 - 20:00",
      price: "$60 USD",
      image: "https://images.unsplash.com/photo-1506102383123-c8ef1e872756?q=80&w=2070",
      tag: "Cupos Limitados"
    },
    {
       title: "Noche de Humo y Brasas",
       category: "Gastronomía",
       description: "Asado criollo gourmet bajo las estrellas. Fuego vivo, los mejores cortes de carne y un ambiente rústico inigualable.",
       time: "21:00 - 00:00",
       price: "$55 USD",
       image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069",
       tag: "Viernes & Sábados"
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2064&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571011270251-561b7f038f88?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
  ];

  return (
    <div className="pt-20 bg-[#FDFBF7] min-h-screen">
      {/* Dynamic Header */}
      <section className="h-[75vh] relative overflow-hidden flex items-end pb-24 px-4">
         <video className="absolute inset-0 w-full h-full object-cover grayscale-[30%]" autoPlay loop muted playsInline>
            <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=727f1bd062ba4313b0c4436531398a69d4d10f60&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-t from-primary-brown via-primary-brown/30 to-transparent" />
         
         <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between gap-10">
               <div className="max-w-2xl">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-primary-beige font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
                  >
                    Vivi la Cordillera
                  </motion.span>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-serif text-white mb-8"
                  >
                    Salidas <span className="italic font-light">&</span> Momentos
                  </motion.h1>
               </div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-white max-w-sm hidden md:block"
               >
                  <p className="italic text-lg mb-4">"No son solo vacaciones, es redescubrir la paz en el silencio de los cerros."</p>
                  <div className="flex text-yellow-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Featured Events Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {events.map((ev, idx) => (
               <motion.div 
                 key={ev.title}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-primary-brown/5 border border-gray-100 group flex flex-col h-full"
               >
                  <div className="h-64 relative overflow-hidden">
                     <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-6 left-6 bg-primary-brown text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                        {ev.tag}
                     </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                     <span className="text-primary-olive font-bold text-xs uppercase tracking-[0.2em] mb-3 block">{ev.category}</span>
                     <h3 className="text-2xl font-serif text-primary-brown mb-4">{ev.title}</h3>
                     <p className="text-gray-500 mb-8 leading-relaxed italic">{ev.description}</p>
                     
                     <div className="mt-auto space-y-4 pt-6 border-t border-gray-50 text-sm font-medium">
                        <div className="flex items-center text-gray-400">
                            <Clock size={16} className="mr-3" />
                            <span>Horario: {ev.time}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                            <MapPin size={16} className="mr-3" />
                            <span>Locación: La Posada & Alrededores</span>
                        </div>
                     </div>
                     
                     <button 
                        onClick={() => window.location.href = '/reserve'}
                        className="mt-8 w-full bg-primary-brown text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center hover:bg-primary-olive shadow-xl transform hover:scale-[1.03] active:scale-95 transition-all cursor-pointer group/btn"
                     >
                        Saber más (${ev.price}) <ArrowUpRight className="ml-2 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Masonry Vibes */}
      <section className="bg-primary-brown py-24 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/3 text-white">
                <h2 className="text-5xl font-serif mb-8 leading-tight">Capturá <br/><span className="italic">momentos</span> reales.</h2>
                <p className="text-primary-beige/60 text-lg mb-10">Tagueanos en tus fotos usando #PosadaDelCerro y participá por un día de campo bonificado.</p>
                <div className="flex items-center gap-6">
                    <Camera className="w-10 h-10 text-primary-beige" />
                    <Martini className="w-10 h-10 text-primary-beige" />
                    <Mountain className="w-10 h-10 text-primary-beige" />
                </div>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 gap-4">
                {galleryImages.map((src, i) => (
                    <motion.img 
                        key={i} 
                        src={src} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`rounded-3xl shadow-2xl ${i % 2 === 0 ? 'mt-8' : '-mt-8'}`} 
                    />
                ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default EventsPage;
