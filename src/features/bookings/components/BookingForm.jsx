import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Calendar as CalendarIcon, Users, Send, CheckCircle, Home } from 'lucide-react';
import { MOCK_ROOMS } from '../../../services/mockData';

const BookingForm = ({ roomData }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    defaultValues: {
      roomId: roomData?.id || '',
      guests: '1'
    }
  });

  const selectedRoomId = watch('roomId');
  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  // Find the selected room from MOCK_ROOMS
  const selectedRoom = MOCK_ROOMS.find(r => r.id === selectedRoomId);
  const maxCapacity = selectedRoom?.capacity || 5;

  // Reset guests if current selection exceeds new room's capacity
  useEffect(() => {
    const currentGuests = parseInt(watch('guests'));
    if (currentGuests > maxCapacity) {
      setValue('guests', String(maxCapacity));
    }
  }, [selectedRoomId, maxCapacity, setValue, watch]);

  // Sync checkIn and checkOut: if checkIn changes and becomes > checkOut, clear checkOut
  useEffect(() => {
    if (checkIn && checkOut && checkIn >= checkOut) {
      setValue('checkOut', '');
    }
  }, [checkIn, checkOut, setValue]);

  const onSubmit = (data) => {
    // Honeypot security check: if this hidden field is filled, it's likely a bot
    if (data.website) {
      console.warn("Honeypot filled. Bot detected.");
      return;
    }

    const room = MOCK_ROOMS.find(r => r.id === data.roomId);
    const roomName = room ? room.name : 'Sin especificar';
    const roomPrice = room ? `$${room.price}/noche` : '';

    const message = [
      `Hola! Quisiera realizar una reserva en La Posada del Cerro.`,
      ``,
      `📋 *Datos de la reserva:*`,
      `🏨 Habitación: ${roomName} ${roomPrice}`,
      `📅 Check-in: ${data.checkIn}`,
      `📅 Check-out: ${data.checkOut}`,
      `👥 Huéspedes: ${data.guests}`,
      ``,
      `👤 *Datos personales:*`,
      `Nombre: ${data.name}`,
      `Email: ${data.email}`,
    ].join('%0A');

    const waUrl = `https://wa.me/5492613433108?text=${encodeURIComponent(message).replace(/%250A/g, '%0A')}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="glass p-10 md:p-16 rounded-[3rem] shadow-premium border-white/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-olive/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      
      <h3 className="text-4xl font-serif text-primary-brown mb-12 flex items-center">
        <CalendarIcon className="w-10 h-10 mr-6 text-primary-olive opacity-80" />
        {t('booking.formHeader')}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Honeypot field - Hidden from humans, visible to bots */}
        <input 
          type="text" 
          {...register('website')} 
          tabIndex="-1" 
          autoComplete="off" 
          className="hidden" 
          style={{ display: 'none' }}
        />

        {/* Room Selector */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">
            <Home className="w-3 h-3 inline mr-2" />
            Habitación
          </label>
          <select 
            {...register('roomId', { required: true })}
            className={`w-full bg-white/40 border ${errors.roomId ? 'border-red-500' : 'border-white/60'} rounded-2xl p-5 focus:outline-none focus:border-primary-olive focus:bg-white transition-all shadow-sm font-bold text-primary-brown cursor-pointer`}
          >
            <option value="">Selecciona una habitación...</option>
            {MOCK_ROOMS.map(room => (
              <option key={room.id} value={room.id}>
                {room.name} — ${room.price}/noche (máx. {room.capacity} pers.)
              </option>
            ))}
          </select>
          {errors.roomId && <p className="text-red-500 text-[10px] ml-1">Selecciona una habitación</p>}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">{t('booking.checkIn')}</label>
            <input 
              type="date" 
              {...register('checkIn', { required: true })}
              className={`w-full bg-white/40 border ${errors.checkIn ? 'border-red-500' : 'border-white/60'} rounded-2xl p-5 focus:outline-none focus:border-primary-olive focus:bg-white transition-all shadow-sm font-bold text-primary-brown`}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">{t('booking.checkOut')}</label>
            <input 
              type="date" 
              {...register('checkOut', { 
                required: true,
                validate: (value) => !checkIn || value > checkIn || t('booking.errorDate')
              })}
              min={checkIn}
              className={`w-full bg-white/40 border ${errors.checkOut ? 'border-red-500' : 'border-white/60'} rounded-2xl p-5 focus:outline-none focus:border-primary-olive focus:bg-white transition-all shadow-sm font-bold text-primary-brown`}
            />
            {errors.checkOut && <p className="text-red-500 text-[10px] ml-1">{errors.checkOut.message}</p>}
          </div>
        </div>

        {/* Guests - dynamic based on room */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">
            <Users className="w-3 h-3 inline mr-2" />
            {t('booking.guests')} {selectedRoom && <span className="text-primary-olive">(máx. {maxCapacity})</span>}
          </label>
          <select 
            {...register('guests', { required: true })}
            className="w-full bg-white/40 border border-white/60 rounded-2xl p-5 focus:outline-none focus:border-primary-olive focus:bg-white transition-all shadow-sm font-bold text-primary-brown cursor-pointer"
          >
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'Huésped' : 'Huéspedes'}</option>
            ))}
          </select>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-white/40">
          <div className="space-y-1">
            <input 
              placeholder={t('booking.fullName')} 
              {...register('name', { required: true })}
              className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-primary-brown/20'} py-4 focus:border-primary-brown focus:outline-none transition-colors font-bold text-primary-brown placeholder:text-gray-400 placeholder:font-normal uppercase text-xs tracking-widest`}
            />
            {errors.name && <p className="text-red-500 text-[10px]">Campo obligatorio</p>}
          </div>
          <div className="space-y-1">
            <input 
              type="email" 
              placeholder={t('booking.email')} 
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-primary-brown/20'} py-4 focus:border-primary-brown focus:outline-none transition-colors font-bold text-primary-brown placeholder:text-gray-400 placeholder:font-normal uppercase text-xs tracking-widest`}
            />
            {errors.email && <p className="text-red-500 text-[10px]">Email inválido</p>}
          </div>
        </div>

        {/* Price Summary */}
        {selectedRoom && checkIn && checkOut && checkOut > checkIn && (
          <div className="bg-primary-brown shadow-xl p-8 rounded-[2rem] text-left relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className="text-primary-beige/50 text-[10px] uppercase font-black tracking-[0.3em] mb-1">{selectedRoom.name}</p>
                <p className="text-primary-beige/40 text-[10px]">
                  {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} noches
                </p>
              </div>
              <div className="text-right">
                <p className="text-primary-beige/50 text-[10px] uppercase font-black tracking-[0.3em] mb-1">{t('booking.total')}</p>
                <span className="text-3xl font-serif text-white font-bold">
                  ${selectedRoom.price * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))}
                </span>
                <span className="text-primary-beige/40 text-[10px] uppercase ml-2">USD</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button - goes to WhatsApp */}
        <button 
          type="submit"
          className="group relative w-full bg-primary-brown text-white py-6 rounded-2xl text-xs font-black uppercase tracking-[0.4em] shadow-premium hover:bg-primary-olive transform transition-all duration-500 active:scale-[0.98] flex items-center justify-center overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            <Send className="w-4 h-4 mr-4 group-hover:translate-x-2 transition-transform duration-500" />
            {t('booking.submit')}
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </button>

        <p className="text-center text-gray-400 text-xs italic">
          Al enviar, serás redirigido a WhatsApp para confirmar tu reserva directamente con nosotros.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
