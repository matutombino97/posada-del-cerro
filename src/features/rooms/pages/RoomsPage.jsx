import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, Bed, Wifi, Tv, Wind, Coffee, Utensils, Waves, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, isDemoMode } from '../../../services/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { MOCK_ROOMS } from '../../../services/mockData';

const RoomsPage = () => {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      setRooms(MOCK_ROOMS);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'habitaciones'), where('published', '==', true));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const firestoreRooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (firestoreRooms.length > 0) {
          setRooms(firestoreRooms);
        } else {
          setRooms(MOCK_ROOMS); // Fallback to mock data
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore error, falling back to mock data:", error);
        setRooms(MOCK_ROOMS);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const amenityIcons = {
    wifi: <Wifi size={18} />,
    ac: <Wind size={18} />,
    tv: <Tv size={18} />,
    coffee: <Coffee size={18} />,
    breakfast: <Utensils size={18} />,
    pool: <Waves size={18} />
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Helmet>
          <title>{t('rooms.title')} | La Posada del Cerro</title>
        </Helmet>
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-brown animate-spin mx-auto mb-4" />
          <p className="text-primary-brown font-medium animate-pulse">{t('rooms.loading') || 'Cargando habitaciones...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-transparent min-h-screen pb-24">
      <Helmet>
        <title>{t('rooms.title')} | La Posada del Cerro Mendoza</title>
        <meta name="description" content={t('rooms.roomsDesc')} />
      </Helmet>

      {/* Header Section */}
      <section className="bg-primary-brown py-20 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-serif mb-6"
            >
                {t('rooms.title')}
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-primary-beige/80 max-w-2xl mx-auto"
            >
                {t('rooms.subtitle')}
            </motion.p>
         </div>
      </section>

      {/* Rooms List */}
      <section className="max-w-7xl mx-auto px-4 mt-20 space-y-20">
        {rooms.length === 0 ? (
          <div className="text-center py-20 bg-primary-beige/30 rounded-[3rem] shadow-sm border border-dashed border-gray-200">
             <h3 className="text-2xl font-serif text-primary-brown mb-4">{t('rooms.noRooms') || 'No hay habitaciones disponibles.'}</h3>
             <p className="text-gray-500">{t('rooms.contactUs') || 'Contáctanos directamente para consultar disponibilidad.'}</p>
          </div>
        ) : rooms.map((room, index) => (
          <motion.div 
            key={room.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-primary-beige/40 rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-500`}
          >
            {/* Image Section */}
            <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden group">
               <img 
                 src={room.image} 
                 alt={room.name} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
               <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl md:text-4xl font-serif text-primary-brown">{room.name}</h2>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block">{t('rooms.from')}</span>
                    <span className="text-2xl font-bold text-primary-olive">${room.price} <span className="text-sm font-normal text-gray-500">/{t('rooms.perNight')}</span></span>
                  </div>
               </div>

               <p className="text-gray-600 text-lg mb-8 leading-relaxed italic">"{room.description}"</p>

               <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center text-gray-700 font-medium bg-primary-beige/10 p-4 rounded-2xl">
                     <Users className="text-primary-brown mr-3" />
                     <span>{t('rooms.capacity')}: {room.capacity} pax</span>
                  </div>
                  <div className="flex items-center text-gray-700 font-medium bg-primary-beige/10 p-4 rounded-2xl">
                     <Bed className="text-primary-brown mr-3" />
                     <span>{room.bedType || room.beds}</span>
                  </div>
               </div>

               <div className="mb-10">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t('rooms.amenities')}</h4>
                  <div className="flex flex-wrap gap-4">
                     {(room.amenities || []).map(amenity => (
                        <div key={amenity} className="flex items-center bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-gray-600 hover:bg-primary-brown hover:text-white transition-colors duration-300">
                           {amenityIcons[amenity]}
                           <span className="ml-2 text-xs font-bold capitalize">{t(`amenities.${amenity}`) || amenity}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to={`/habitaciones/${room.id}`}
                    className="flex-1 bg-primary-brown text-white py-4 rounded-xl font-bold text-center hover:bg-opacity-90 shadow-lg transition-all active:scale-95"
                  >
                    {t('rooms.viewDetail')}
                  </Link>
                  <Link 
                    to="/reserve"
                    className="flex-1 border-2 border-primary-brown text-primary-brown py-4 rounded-xl font-bold text-center hover:bg-primary-brown hover:text-white transition-all active:scale-95"
                  >
                    {t('navbar.reserve')}
                  </Link>
               </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-32 text-center bg-primary-olive/10 p-16 rounded-[3rem] border-2 border-dashed border-primary-olive/20">
         <h2 className="text-3xl font-serif text-primary-brown mb-6">{t('cta.somethingSpecial')}</h2>
         <p className="text-gray-600 mb-10">{t('cta.specialDesc')}</p>
         <Link to="/#contact" className="inline-block bg-primary-olive text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all">{t('cta.consultWA')}</Link>
      </section>
    </div>
  );
};

export default RoomsPage;
