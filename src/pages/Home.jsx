import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Star, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import WelcomeSection from '../components/WelcomeSection';
import RoomCard from '../features/rooms/components/RoomCard';
import Reviews from '../features/reviews/components/Reviews';
import BlogPreview from '../features/blog/components/BlogPreview';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { db, isDemoMode } from '../services/firebase';
import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
import { MOCK_ROOMS } from '../services/mockData';

import QuickBookingBar from '../features/bookings/components/QuickBookingBar';

const Home = () => {
  const { t } = useTranslation();
  useScrollReveal();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      setRooms(MOCK_ROOMS.slice(0, 3));
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'habitaciones'), 
      where('published', '==', true),
      limit(3)
    );
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const firestoreRooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (firestoreRooms.length > 0) {
          setRooms(firestoreRooms);
        } else {
          setRooms(MOCK_ROOMS.slice(0, 3));
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore error in home, using mock data:", error);
        setRooms(MOCK_ROOMS.slice(0, 3));
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-0">
      <Helmet>
        <title>La Posada del Cerro | Hostería Boutique en Mendoza</title>
        <meta name="description" content="Relájate en nuestra hostería boutique en Luján de Cuyo, Mendoza. Habitaciones de lujo, vistas a la montaña y la mejor atención personalizada." />
        <meta property="og:title" content="La Posada del Cerro - Mendoza" />
        <meta property="og:description" content="Experiencia de montaña y viñedos en el corazón de Mendoza." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <WelcomeSection />
      
      {/* Rooms Grid Section - Highlights */}
      <section id="rooms" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal">
          <span className="text-primary-olive font-black uppercase text-[10px] tracking-[0.3em] mb-4 block">Experiencia de Lujo</span>
          <h2 className="text-5xl md:text-7xl font-serif text-primary-brown mb-8">{t('rooms.title')}</h2>
          <div className="w-32 h-1.5 bg-primary-olive mx-auto mb-10" />
          <p className="max-w-3xl mx-auto text-gray-600 text-xl font-light italic leading-relaxed">
            {t('rooms.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <Loader2 className="w-10 h-10 text-primary-brown animate-spin mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Buscando nuestras mejores suites...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white/50 rounded-3xl border-2 border-dashed border-primary-brown/10">
              <p className="text-gray-500 italic">No hay habitaciones disponibles para mostrar en este momento.</p>
            </div>
          ) : rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* Events Highlight - New */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 reveal">
            <span className="text-primary-olive font-black uppercase text-xs tracking-[0.3em] mb-4 block">Experiencias Únicas</span>
            <h2 className="text-5xl md:text-6xl font-serif text-primary-brown mb-8 leading-tight">Momentos que <span className="italic">inspiran</span></h2>
            <p className="text-gray-600 text-xl font-light mb-10 leading-relaxed">
              Desde cabalgatas al atardecer hasta catas exclusivas de Malbec bajo las estrellas. Diseñamos actividades para que conectes con la tierra.
            </p>
            <div className="space-y-6 mb-12">
               <div className="flex items-center gap-4 text-primary-brown font-semibold">
                  <div className="w-12 h-12 bg-primary-olive/10 rounded-2xl flex items-center justify-center text-primary-olive">
                     <Star size={20} />
                  </div>
                  Pool Day & Sunset Malbec
               </div>
               <div className="flex items-center gap-4 text-primary-brown font-semibold">
                  <div className="w-12 h-12 bg-primary-olive/10 rounded-2xl flex items-center justify-center text-primary-olive">
                     <Star size={20} />
                  </div>
                  Noches de Humo y Brasas
               </div>
               <div className="flex items-center gap-4 text-primary-brown font-semibold">
                  <div className="w-12 h-12 bg-primary-olive/10 rounded-2xl flex items-center justify-center text-primary-olive">
                     <Star size={20} />
                  </div>
                  Wine Tasting Privado
               </div>
               <div className="flex items-center gap-4 text-primary-brown font-semibold">
                  <div className="w-12 h-12 bg-primary-olive/10 rounded-2xl flex items-center justify-center text-primary-olive">
                     <Star size={20} />
                  </div>
                  Masajes y Spa Boutique
               </div>
               <div className="flex items-center gap-4 text-primary-olive font-black uppercase text-[10px] tracking-widest bg-primary-olive/5 p-4 rounded-2xl border border-primary-olive/10 w-fit">
                  {t('booking.available') ? 'y más...' : 'y más...'}
               </div>
            </div>
            <Link to="/servicios" className="inline-block bg-primary-olive text-white px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary-brown transition-all shadow-xl transform hover:scale-105 active:scale-95"> {t('navbar.services')} </Link>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 reveal">
             <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000" className="rounded-[3rem] h-[500px] w-full object-cover shadow-2xl" alt="Event" />
             <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?q=80&w=1000" className="rounded-[3rem] h-[240px] w-full object-cover shadow-2xl" alt="Event" />
                <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000" className="rounded-[3rem] h-[240px] w-full object-cover shadow-2xl" alt="Event" />
             </div>
          </div>
        </div>
      </section>

      {/* Promotions Highlight - New Banner */}
      <section className="py-24 px-4 max-w-7xl mx-auto reveal">
         <div className="bg-primary-brown rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden flex flex-col items-center text-center shadow-[0_50px_100px_-20px_rgba(58,41,23,0.3)]">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1482867996988-29ec3aee816d?q=80&w=2000" alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 max-w-3xl">
               <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[.3em] mb-8 inline-block">Ofertas de Invierno</span>
               <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight italic">4 noches por el precio de 3.</h2>
               <p className="text-primary-beige/70 text-xl font-light mb-12">Disfrutá de la nieve mendocina con nuestra promoción exclusiva de temporada. Quedate más, viví más.</p>
               <Link to="/promociones" className="bg-primary-beige text-primary-brown px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary-olive hover:text-white transition-all transform hover:scale-110 shadow-2xl">
                  {t('navbar.promotions')}
               </Link>
            </div>
         </div>
      </section>

      {/* Gallery Highlight Section */}
      <section className="py-32 bg-primary-brown text-white overflow-hidden relative mt-12">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">Capturamos la esencia de <span className="text-primary-olive italic">Mendoza</span></h2>
            <p className="text-primary-beige/70 text-xl mb-12 font-light leading-relaxed">
              Explora visualmente nuestra posada, desde los amaneceres sobre la viña hasta las noches estrelladas frente al fuego.
            </p>
            <Link to="/galeria" className="inline-flex items-center bg-primary-beige text-primary-brown px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary-olive hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-2xl group">
              {t('navbar.gallery')} <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000" className="rounded-3xl h-48 w-full object-cover shadow-2xl" alt="" />
             <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000" className="rounded-3xl h-48 w-full object-cover mt-12 shadow-2xl" alt="" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Blog Section Highlights */}
      <div className="py-24">
        <BlogPreview />
        <div className="text-center mt-12">
           <Link to="/blog" className="text-primary-brown font-black uppercase text-[10px] tracking-[.3em] border-b-2 border-primary-olive pb-2 hover:text-primary-olive transition-colors"> {t('blog.readMore')} </Link>
        </div>
      </div>

      {/* Contact CTA Banner */}
      <section className="py-32 border-y border-primary-brown/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-primary-brown mb-8 leading-tight">¿Listo para una experiencia inolvidable?</h2>
          <p className="text-gray-500 text-xl mb-12 font-light">Escribinos para consultas personalizadas o reservas de grupos especiales.</p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Link to="/contacto" className="bg-primary-brown text-white px-14 py-6 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary-olive transition-all transform hover:scale-110 shadow-2xl">
              {t('navbar.contact')}
            </Link>
            <a href="https://wa.me/5492613433108" className="bg-primary-beige/20 border-2 border-primary-brown text-primary-brown px-14 py-6 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary-beige transition-all transform hover:scale-110 shadow-xl">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <QuickBookingBar />
    </div>
  );
};

export default Home;
