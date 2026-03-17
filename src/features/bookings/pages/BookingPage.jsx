import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  // In a real app, you might select a room here or pass one via URL
  const selectedRoom = {
    name: "General - Reserva Abierta",
    price: 135
  };

  return (
    <div className="py-24 bg-primary-beige/5 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-primary-brown mb-6">Planifica tu Estadía</h1>
          <p className="text-gray-500 italic max-w-xl mx-auto">
            Completa el formulario y nos pondremos en contacto para confirmar la disponibilidad y los detalles de tu llegada.
          </p>
        </div>

        <BookingForm roomData={selectedRoom} />
      </div>
    </div>
  );
};

export default BookingPage;
