import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Tag, Calendar, Gift, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromotionsPage = () => {
  const { t } = useTranslation();
  const promos = [
    {
      title: "Escapada Romántica",
      subtitle: "Fin de semana inolvidable",
      price: "15% OFF",
      description: "Incluye cena a la luz de las velas, botella de Malbec de bienvenida y late check-out el domingo.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
      badge: "Popular"
    },
    {
      title: "Especial Nieve",
      subtitle: "Pack Invierno 2026",
      price: "4x3 Noches",
      description: "Quedate 4 noches y paga solo 3. Incluye traslado a centros de esquí cercanos y chocolate caliente libre.",
      image: "https://images.unsplash.com/photo-1482867996988-29ec3aee816d?q=80&w=2071&auto=format&fit=crop",
      badge: "Sacional"
    },
    {
       title: "Reserva Anticipada",
       subtitle: "Planifica y ahorra",
       price: "20% OFF",
       description: "Reservando con 60 días de anticipación, accede a la mejor tarifa garantizada para cualquiera de nuestras suites.",
       image: "https://images.unsplash.com/photo-1549414349-8c9df4345d94?q=80&w=2070&auto=format&fit=crop",
       badge: "Limitado"
    }
  ];

  return (
    <div className="pt-20 bg-primary-beige/5 min-h-screen pb-24">
      <Helmet>
        <title>{t('navbar.promotions')} | La Posada del Cerro</title>
        <meta name="description" content="Aprovecha nuestras promociones exclusivas para tu estadía en Mendoza." />
      </Helmet>
      {/* Header */}
      <section className="py-24 border-b border-primary-brown/10">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-olive text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Tag size={14} />
                <span>{t('promotions.headerBadge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-primary-brown mb-6">{t('promotions.headerTitle')}</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('promotions.headerSubtitle')}
            </p>
         </div>
      </section>

      {/* Promos Layout */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
         <div className="space-y-12">
            {promos.map((promo, idx) => (
               <motion.div 
                 key={promo.title}
                 initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="flex flex-col md:flex-row bg-white rounded-[3rem] shadow-2xl shadow-primary-brown/5 overflow-hidden group border border-gray-100"
               >
                  <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                     <img src={promo.image} alt={promo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute top-6 left-6 bg-white text-primary-olive px-6 py-2 rounded-full font-bold text-xs shadow-lg flex items-center">
                        <Gift size={12} className="mr-2" /> {promo.badge}
                     </div>
                  </div>
                  <div className="md:w-3/5 p-12 lg:p-20 flex flex-col justify-center">
                     <h4 className="text-primary-olive font-bold text-sm uppercase tracking-widest mb-2">{promo.subtitle}</h4>
                     <h3 className="text-4xl font-serif text-primary-brown mb-6">{promo.title}</h3>
                     <p className="text-gray-500 text-lg mb-8 leading-relaxed italic border-l-4 border-primary-beige/30 pl-6">
                        {promo.description}
                     </p>
                     <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-50">
                        <div className="text-3xl font-serif text-primary-brown font-bold flex flex-col">
                           <span className="text-xs text-gray-400 font-sans uppercase tracking-[0.2em]">{t('promotions.priceText')}</span>
                           {promo.price}
                        </div>
                        <Link 
                            to="/reserve"
                            className="bg-primary-brown text-white h-16 w-16 rounded-full flex items-center justify-center hover:bg-primary-olive transition-all shadow-lg shadow-primary-brown/20 group-hover:rotate-[-45deg]"
                        >
                            <ArrowRight />
                        </Link>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Trust Banner removed by user request */}
    </div>
  );
};

export default PromotionsPage;
