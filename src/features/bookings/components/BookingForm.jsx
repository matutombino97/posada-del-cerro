import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Calendar as CalendarIcon, Users, CreditCard, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { format, differenceInDays, isWithinInterval, parseISO } from 'date-fns';
import { db } from '../../../services/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

const BookingForm = ({ roomData }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(null);
  const [checking, setChecking] = useState(false);

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const days = differenceInDays(end, start);
      
      if (days > 0) {
        setTotalPrice(days * (roomData?.price || 120));
        checkAvailability();
      } else {
        setTotalPrice(0);
        setIsAvailable(null);
      }
    }
  }, [checkIn, checkOut, roomData]);

  const checkAvailability = async () => {
    if (!checkIn || !checkOut || !roomData?.id) return;
    
    setChecking(true);
    try {
      const q = query(
        collection(db, 'reservas'),
        where('roomId', '==', roomData.id),
        where('status', '!=', 'cancelada')
      );
      
      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map(doc => doc.data());
      
      const requestedIn = parseISO(checkIn);
      const requestedOut = parseISO(checkOut);
      
      const hasOverlap = bookings.some(booking => {
        const existingIn = parseISO(booking.checkIn);
        const existingOut = parseISO(booking.checkOut);
        
        return (requestedIn < existingOut && requestedOut > existingIn);
      });
      
      setIsAvailable(!hasOverlap);
    } catch (error) {
      console.error("Error checking availability:", error);
    } finally {
      setChecking(false);
    }
  };

  const onSubmit = async (data) => {
    if (!isAvailable) {
      alert("Lo sentimos, estas fechas ya no están disponibles.");
      return;
    }

    try {
      const bookingData = {
        ...data,
        roomId: roomData?.id,
        roomName: roomData?.name || 'Habitación seleccionada',
        totalPrice,
        status: 'pendiente',
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'reservas'), bookingData);
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Hubo un error al procesar tu reserva. Por favor intenta de nuevo.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-xl text-center reveal active">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-3xl font-serif text-primary-brown mb-4">¡Reserva Enviada!</h3>
        <p className="text-gray-600 mb-8">
          Hemos recibido tu solicitud. Te enviaremos un email de confirmación a <strong>{watch('email')}</strong> a la brevedad.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-primary-brown text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-primary-beige/20">
      <h3 className="text-3xl font-serif text-primary-brown mb-8 flex items-center">
        <CalendarIcon className="w-8 h-8 mr-4 text-primary-olive" />
        Reserva tu Estadía
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dates */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase">Fecha Entrada</label>
            <input 
              type="date" 
              {...register('checkIn', { required: true })}
              className="w-full bg-primary-beige/5 border border-primary-beige/30 rounded-lg p-3 focus:outline-none focus:border-primary-olive transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase">Fecha Salida</label>
            <input 
              type="date" 
              {...register('checkOut', { required: true })}
              className="w-full bg-primary-beige/5 border border-primary-beige/30 rounded-lg p-3 focus:outline-none focus:border-primary-olive transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Guests & Room */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase">Huéspedes</label>
            <select 
              {...register('guests', { required: true })}
              className="w-full bg-primary-beige/5 border border-primary-beige/30 rounded-lg p-3 focus:outline-none focus:border-primary-olive transition-colors"
            >
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Huésped{n > 1 ? 'es' : ''}</option>)}
            </select>
          </div>
          <div className="space-y-2 flex flex-col justify-end">
             {checking && (
               <div className="flex items-center text-primary-olive text-sm font-bold animate-pulse p-3">
                 <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verificando disponibilidad...
               </div>
             )}
             {!checking && isAvailable === true && (
               <div className="flex items-center text-green-600 text-sm font-bold bg-green-50 p-3 rounded-lg">
                 <CheckCircle className="w-4 h-4 mr-2" /> ¡Disponible para estas fechas!
               </div>
             )}
             {!checking && isAvailable === false && (
               <div className="flex items-center text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">
                 <AlertCircle className="w-4 h-4 mr-2" /> No hay disponibilidad en este rango.
               </div>
             )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
           <div className="space-y-4 pt-4 border-t border-primary-beige/10 w-full">
              {/* User Info */}
              <input 
                placeholder="Nombre Completo" 
                {...register('name', { required: true })}
                className="w-full border-b border-primary-beige/40 py-3 focus:border-primary-brown focus:outline-none transition-colors"
              />
              <input 
                type="email" 
                placeholder="Correo Electrónico" 
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full border-b border-primary-beige/40 py-3 focus:border-primary-brown focus:outline-none transition-colors"
              />
              <input 
                placeholder="Teléfono / WhatsApp" 
                {...register('phone', { required: true })}
                className="w-full border-b border-primary-beige/40 py-3 focus:border-primary-brown focus:outline-none transition-colors"
              />
           </div>
           
           <div className="text-right">
             {totalPrice > 0 && (
               <div className="bg-primary-olive/10 p-4 rounded-2xl inline-block min-w-[150px]">
                 <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">Total</p>
                 <p className="text-3xl font-serif text-primary-olive font-bold">${totalPrice}</p>
               </div>
             )}
           </div>
        </div>

        <button 
          type="submit"
          disabled={!isAvailable || checking}
          className="w-full bg-primary-brown text-white py-5 rounded-xl text-xl font-bold shadow-lg hover:bg-opacity-90 transform transition active:scale-[0.98] flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
          {isAvailable === false ? 'Fechas no disponibles' : 'Confirmar Solicitud de Reserva'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
