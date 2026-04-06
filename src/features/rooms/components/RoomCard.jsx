import { Link } from 'react-router-dom';
import { Users, BedDouble, Maximize } from 'lucide-react';

const RoomCard = ({ room }) => {
  return (
    <div className="group bg-[#F5E6BE] rounded-[2.5rem] overflow-hidden shadow-premium hover:shadow-[0_50px_100px_-20px_rgba(58,41,23,0.25)] transition-all duration-700 border border-primary-brown/10 cursor-pointer relative">
      <Link to={`/rooms/${room.id}`} className="relative h-80 overflow-hidden block focus-visible:outline-2 focus-visible:outline-primary-olive focus-visible:outline-offset-2">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="absolute top-6 right-6 glass px-6 py-2 rounded-full text-primary-brown font-black text-sm shadow-xl border-white/40">
          <span className="font-accent italic text-lg opacity-80" aria-label={`Precio: $${room.price} por noche`}>${room.price}</span> 
          <span className="text-gray-500 font-normal text-[10px] uppercase tracking-widest ml-1">/ noche</span>
        </div>
      </Link>
      
      <div className="p-10">
        <div className="flex justify-between items-start mb-4">
           <h3 className="text-3xl font-serif text-primary-brown group-hover:text-primary-olive transition-colors leading-tight">{room.name}</h3>
        </div>
        
        <div className="flex items-center space-x-6 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <div className="flex items-center" aria-label={`Capacidad: ${room.capacity} huéspedes`}>
            <Users className="w-3 h-3 mr-2 text-primary-olive" aria-hidden="true" />
            {room.capacity} Huéspedes
          </div>
          <div className="flex items-center border-l border-primary-brown/10 pl-6" aria-label={`Tipo de cama: ${room.bedType}`}>
            <BedDouble className="w-3 h-3 mr-2 text-primary-olive" aria-hidden="true" />
            {room.bedType}
          </div>
        </div>

        <Link
          to={`/rooms/${room.id}`}
          className="relative block w-full text-center bg-primary-brown text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-primary-olive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-olive transform active:scale-95 transition-all duration-500 shadow-xl overflow-hidden group/btn"
        >
          <span className="relative z-10">Explorar Detalle</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 opacity-10" />
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
