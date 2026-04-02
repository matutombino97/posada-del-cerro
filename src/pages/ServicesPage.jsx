import { motion } from 'framer-motion';
import { Waves, Sparkles, Coffee, Utensils, Wifi, Car, Mountain, Martini } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const ServicesPage = () => {
  const { t } = useTranslation();
  const mainServices = [
    {
      title: "Piscina Climatizada",
      description: "Relájate en nuestra piscina con vista infinita al Cordón de Plata. Disponible todo el año para tu máximo confort.",
      icon: <Waves className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Desayuno de Campo",
      description: "Comienza el día con productos regionales, panificados artesanales y frutas de nuestra huerta orgánica.",
      icon: <Utensils className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Degustación de Vinos",
      description: "Contamos con una cava privada con las mejores etiquetas de Mendoza. Sesiones de degustación guiada todas las tardes.",
      icon: <Martini className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop"
    },
    {
       title: "Spa & Bienestar",
       description: "Masajes descontracturantes, limpiezas faciales y aromaterapia en un ambiente de paz total.",
       icon: <Sparkles className="w-10 h-10" />,
       image: "https://images.unsplash.com/photo-1544161515-4af6b1d46af0?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const quickServices = [
    { name: "Parking Privado", icon: <Car size={20} /> },
    { name: "Wifi Alta Velocidad", icon: <Wifi size={20} /> },
    { name: "Excursiones", icon: <Mountain size={20} /> },
    { name: "Room Service", icon: <Coffee size={20} /> },
  ];

  return (
    <div className="pt-20 bg-[#FDFBF7] min-h-screen">
      <Helmet>
        <title>{t('navbar.services')} | La Posada del Cerro</title>
        <meta name="description" content="Servicios exclusivos y experiencias boutique en nuestra posada de Mendoza." />
      </Helmet>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571011270251-561b7f038f88?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
            <div className="absolute inset-0 bg-primary-brown/60 backdrop-blur-[2px]" />
         </div>
         <div className="relative z-10 max-w-4xl">
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif text-white mb-6"
            >
                Vivilo a tu manera
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-primary-beige font-light max-w-2xl mx-auto"
            >
                Cada detalle en La Posada está pensado para que tu estadía sea una experiencia sensorial inolvidable.
            </motion.p>
         </div>
      </section>

      {/* Main Services Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pb-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
               <motion.div 
                 key={service.title}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden group hover:shadow-primary-olive/20 transition-all duration-500 border border-gray-100"
               >
                  <div className="h-72 overflow-hidden relative">
                     <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                     <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-3xl text-primary-olive shadow-lg">
                        {service.icon}
                     </div>
                  </div>
                  <div className="p-10">
                     <h3 className="text-3xl font-serif text-primary-brown mb-4 tracking-tight">{service.title}</h3>
                     <p className="text-gray-500 leading-relaxed text-lg italic">
                        {service.description}
                     </p>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Extra Services Banner */}
      <section className="bg-primary-brown py-20">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10">
            {quickServices.map((item, idx) => (
               <motion.div 
                 key={item.name}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="flex flex-col items-center text-center"
               >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary-beige mb-4 border border-white/5 transition-all hover:bg-white hover:text-primary-brown">
                     {item.icon}
                  </div>
                  <span className="text-primary-beige font-bold tracking-widest text-xs uppercase">{item.name}</span>
               </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default ServicesPage;
