import { Link } from 'react-router-dom';
import { Users, BedDouble, Maximize } from 'lucide-react';

const RoomCard = ({ room }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-primary-brown font-bold text-sm shadow-md">
          ${room.price} <span className="text-gray-500 font-normal text-xs">/ noche</span>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-serif text-primary-brown mb-3 group-hover:text-primary-olive transition-colors">{room.name}</h3>
        
        <div className="flex items-center space-x-4 mb-8 text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-primary-olive" />
            {room.capacity} pers.
          </div>
          <div className="flex items-center border-l border-gray-100 pl-4">
            <BedDouble className="w-4 h-4 mr-2 text-primary-olive" />
            {room.bedType}
          </div>
        </div>

        <Link
          to={`/rooms/${room.id}`}
          className="block w-full text-center bg-transparent border-2 border-primary-brown text-primary-brown py-3 rounded-xl font-bold hover:bg-primary-brown hover:text-white transform active:scale-95 transition-all duration-300"
        >
          Explorar Detalle
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
