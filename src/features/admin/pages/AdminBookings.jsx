import { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { Check, X, Clock, Filter, Search } from 'lucide-react';
import { clsx } from 'clsx';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const q = query(collection(db, 'reservas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'reservas', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  if (loading) return <div className="text-center py-20 italic text-gray-400">Cargando reservas...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-primary-brown mb-2">Gestión de Reservas</h1>
          <p className="text-gray-400">Administra las solicitudes de estadía en tiempo real.</p>
        </div>

        <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1">
          {['all', 'pendiente', 'confirmada', 'cancelada'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize",
                filter === status ? "bg-primary-brown text-white shadow-md" : "text-gray-400 hover:text-primary-brown"
              )}
            >
              {status === 'all' ? 'Todas' : status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Huésped</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Estadía</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-gray-400 italic">No se encontraron reservas.</td>
                </tr>
              ) : filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-primary-beige/5 transition-colors">
                  <td className="px-6 py-6">
                    <p className="font-bold text-gray-800">{booking.name}</p>
                    <p className="text-xs text-gray-500">{booking.email}</p>
                    <p className="text-xs text-gray-400 font-mono mt-1">{booking.phone}</p>
                  </td>
                  <td className="px-6 py-6 font-medium text-sm text-gray-600">
                    <p>{booking.checkIn} → {booking.checkOut}</p>
                    <p className="text-xs text-gray-400 mt-1">{booking.roomName} ({booking.guests} pers.)</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-bold text-primary-olive text-lg">${booking.totalPrice}</p>
                  </td>
                  <td className="px-6 py-6">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm",
                      booking.status === 'confirmada' && "bg-green-100 text-green-700",
                      booking.status === 'pendiente' && "bg-yellow-100 text-yellow-700",
                      booking.status === 'cancelada' && "bg-red-100 text-red-700"
                    )}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex space-x-2">
                      {booking.status !== 'confirmada' && (
                        <button 
                          onClick={() => updateStatus(booking.id, 'confirmada')}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                          title="Confirmar"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      {booking.status !== 'cancelada' && (
                        <button 
                          onClick={() => updateStatus(booking.id, 'cancelada')}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          title="Cancelar"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
