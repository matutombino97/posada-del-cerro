import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowLeft, Users, BedDouble, Wifi, Wind, MapPin, Coffee, Loader2 } from 'lucide-react';
import { db, isDemoMode } from '../../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MOCK_ROOMS } from '../../../services/mockData';

const RoomDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      if (isDemoMode) {
        const mockRoom = MOCK_ROOMS.find(r => r.id === id);
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
          // Fallback to mock data
          const mockRoom = MOCK_ROOMS.find(r => r.id === id);
          if (mockRoom) setRoom(mockRoom);
        }
      } catch (error) {
        console.warn("Firestore error, using mock data:", error);
        const mockRoom = MOCK_ROOMS.find(r => r.id === id);
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
    <div className="pt-20 pb-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-primary-olive hover:text-primary-brown mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Inicio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
            </div>
            {room.gallery && room.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {room.gallery.map((img, i) => (
                  <div key={i} className="h-32 rounded-2xl overflow-hidden shadow-md">
                    <img src={img} alt={`${room.name} ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-primary-brown mb-4">{room.name}</h1>
              <div className="flex items-center text-primary-olive font-bold text-2xl mb-6">
                ${room.price} <span className="text-gray-400 font-normal text-sm ml-2">/ noche</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg italic">
                "{room.description}"
              </p>
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

            <button className="w-full bg-primary-brown text-white py-4 rounded-xl text-lg font-bold hover:bg-opacity-90 shadow-lg transform transition active:scale-95">
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
