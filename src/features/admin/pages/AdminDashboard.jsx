import { useState, useEffect } from 'react';
import { CalendarCheck, Users, Banknote, Star, MessageSquare } from 'lucide-react';
import { db } from '../../../services/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ bookings: 0, reviews: 0, messages: 0, rooms: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubBookings = onSnapshot(collection(db, 'reservas'), (snap) => {
      setCounts(prev => ({ ...prev, bookings: snap.size }));
    });
    const unsubReviews = onSnapshot(collection(db, 'reseñas'), (snap) => {
      setCounts(prev => ({ ...prev, reviews: snap.size }));
    });
    const unsubMessages = onSnapshot(collection(db, 'mensajes'), (snap) => {
      setCounts(prev => ({ ...prev, messages: snap.size }));
    });
    const unsubRooms = onSnapshot(collection(db, 'habitaciones'), (snap) => {
      setCounts(prev => ({ ...prev, rooms: snap.size }));
      setLoading(false);
    });

    return () => {
      unsubBookings();
      unsubReviews();
      unsubMessages();
      unsubRooms();
    };
  }, []);

  const stats = [
    { name: 'Total Reservas', value: counts.bookings, icon: CalendarCheck, color: 'bg-blue-500' },
    { name: 'Habitaciones', value: counts.rooms, icon: Users, color: 'bg-green-500' },
    { name: 'Mensajes', value: counts.messages, icon: MessageSquare, color: 'bg-amber-500' },
    { name: 'Reseñas', value: counts.reviews, icon: Star, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-serif text-primary-brown mb-2">Panel de Resumen</h1>
        <p className="text-gray-400">Bienvenido de nuevo, Administrador. Aquí tienes el estado actual de la Posada.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.name}</p>
              <p className="text-3xl font-serif text-primary-brown mt-1 font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-serif text-primary-brown mb-6">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center text-sm">
                <span className="text-gray-600">Última reserva recibida</span>
                <span className="font-bold text-primary-brown">Recientemente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
