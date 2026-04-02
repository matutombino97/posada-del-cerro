import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowLeft, Users, BedDouble, Loader2, ChevronLeft, ChevronRight, ZoomIn, X, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, isDemoMode } from '../../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MOCK_ROOMS } from '../../../services/mockData';

/* ────────────────────────────────────────────────
   Booking Modal Component
   ──────────────────────────────────────────────── */
const BookingModal = ({ room, onClose }) => {
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: 1 });

  // Generate guest options up to room capacity
  const guestOptions = Array.from({ length: room.capacity }, (_, i) => i + 1);

  const buildWhatsAppLink = () => {
    const name = encodeURIComponent(room.name);
    const checkIn = form.checkIn ? `%0ACheck-in:%20${form.checkIn}` : '';
    const checkOut = form.checkOut ? `%0ACheck-out:%20${form.checkOut}` : '';
    const guests = `%0AHuéspedes:%20${form.guests}`;
    return `https://wa.me/5492613433108?text=Hola!%20Quisiera%20reservar%20la%20${name}%20en%20La%20Posada%20del%20Cerro${checkIn}${checkOut}${guests}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-[#FDFBF7] rounded-[2.5rem] p-8 md:p-12 w-full max-w-lg shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary-brown/5 flex items-center justify-center text-primary-brown hover:bg-primary-brown/10 hover:rotate-90 transition-all"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <span className="text-primary-olive font-black uppercase text-[10px] tracking-[0.3em] mb-2 block">Reservar</span>
          <h2 className="text-3xl font-serif text-primary-brown leading-tight">{room.name}</h2>
          <p className="text-gray-400 text-sm mt-1">${room.price} / noche · Hasta {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}</p>
        </div>

        {/* Fields */}
        <div className="space-y-4 mb-8">
          {/* Check-in */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha de llegada</label>
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-primary-brown/10 focus-within:border-primary-olive transition-colors">
              <Calendar size={16} className="text-primary-olive flex-shrink-0" />
              <input
                type="date"
                value={form.checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                className="bg-transparent text-sm font-semibold text-primary-brown focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha de salida</label>
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-primary-brown/10 focus-within:border-primary-olive transition-colors">
              <Calendar size={16} className="text-primary-olive flex-shrink-0" />
              <input
                type="date"
                value={form.checkOut}
                min={form.checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                className="bg-transparent text-sm font-semibold text-primary-brown focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Guests — capped at room.capacity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Huéspedes <span className="text-primary-olive">(máx. {room.capacity})</span>
            </label>
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-primary-brown/10 focus-within:border-primary-olive transition-colors">
              <Users size={16} className="text-primary-olive flex-shrink-0" />
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                className="bg-transparent text-sm font-semibold text-primary-brown focus:outline-none w-full cursor-pointer"
              >
                {guestOptions.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary-brown text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-primary-olive transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
        >
          <ArrowRight size={16} />
          Confirmar por WhatsApp
        </a>

        <p className="text-center text-xs text-gray-400 mt-4">
          Te redirige a WhatsApp con todos los datos listos ✓
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────
   Main RoomDetail Component
   ──────────────────────────────────────────────── */
const RoomDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Auto-carousel
  useEffect(() => {
    if (!room?.gallery || isZoomOpen || isBookingOpen) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % room.gallery.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [room, isZoomOpen, isBookingOpen]);

  const nextImage = () => {
    if (!room?.gallery) return;
    setCurrentImage((prev) => (prev + 1) % room.gallery.length);
  };

  const prevImage = () => {
    if (!room?.gallery) return;
    setCurrentImage((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
  };

  useEffect(() => {
    const fetchRoom = async () => {
      if (isDemoMode) {
        const mockRoom = MOCK_ROOMS.find((r) => r.id === id);
        setRoom(mockRoom || null);
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'habitaciones', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoom({ id: docSnap.id, ...docSnap.data() });
        } else {
          const mockRoom = MOCK_ROOMS.find((r) => r.id === id);
          if (mockRoom) setRoom(mockRoom);
        }
      } catch (error) {
        console.warn('Firestore error, using mock data:', error);
        const mockRoom = MOCK_ROOMS.find((r) => r.id === id);
        if (mockRoom) setRoom(mockRoom);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-beige/5">
        <Helmet>
          <title>Habitación | La Posada del Cerro</title>
        </Helmet>
        <Loader2 className="w-12 h-12 text-primary-brown animate-spin" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary-beige/5">
        <h2 className="text-3xl font-serif text-primary-brown mb-4">Habitación no encontrada</h2>
        <Link to="/habitaciones" className="text-primary-olive hover:underline">Volver al listado</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-32 bg-[#FDFBF7]">
      <Helmet>
        <title>{room.name} | La Posada del Cerro</title>
        <meta name="description" content={room.description} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-primary-olive hover:text-primary-brown mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Inicio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Gallery Pro (sticky) ── */}
          <div className="space-y-6 top-28 lg:sticky">
            <div
              className="relative h-[400px] md:h-[580px] rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.07 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6 }}
                  src={room.gallery ? room.gallery[currentImage] : room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Prev / Next overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ZoomIn size={20} />
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {room.gallery?.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {room.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                      currentImage === i
                        ? 'border-primary-olive scale-105 shadow-lg'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${room.name} ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Zoom Lightbox ── */}
          <AnimatePresence>
            {isZoomOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                onClick={() => setIsZoomOpen(false)}
              >
                <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform p-3">
                  <X size={40} />
                </button>
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={room.gallery ? room.gallery[currentImage] : room.image}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Room Details ── */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-primary-brown mb-4">{room.name}</h1>
              <div className="flex items-center text-primary-olive font-bold text-2xl mb-6">
                ${room.price} <span className="text-gray-400 font-normal text-sm ml-2">/ noche</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg italic">"{room.description}"</p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-8 border-y border-primary-beige/30">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3 text-primary-olive" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Capacidad</p>
                  <p className="font-semibold text-gray-700">{room.capacity} Personas</p>
                </div>
              </div>
              <div className="flex items-center">
                <BedDouble className="w-5 h-5 mr-3 text-primary-olive" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Camas</p>
                  <p className="font-semibold text-gray-700">{room.bedType}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif text-primary-brown mb-6">Comodidades</h3>
              <div className="grid grid-cols-2 gap-y-4">
                {(room.amenities || []).map((item, i) => (
                  <div key={i} className="flex items-center text-gray-600">
                    <Check className="w-4 h-4 mr-3 text-green-600" />
                    <span className="capitalize">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Reserve Button → opens modal ── */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full bg-primary-brown text-white py-5 rounded-[1.5rem] text-lg font-black uppercase tracking-widest hover:bg-primary-olive transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal room={room} onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomDetail;
