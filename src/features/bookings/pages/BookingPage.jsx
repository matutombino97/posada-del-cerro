import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  const { t } = useTranslation();
  // In a real app, you might select a room here or pass one via URL
  const selectedRoom = {
    name: "General - Reserva Abierta",
    price: 135
  };

  return (
    <div className="pt-40 bg-primary-beige/5 min-h-screen pb-24">
      <Helmet>
        <title>{t('navbar.reserve')} | La Posada del Cerro</title>
        <meta name="description" content="Reserva tu estadía boutique en Mendoza." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-primary-brown mb-6">{t('booking.title')}</h1>
          <p className="text-gray-500 italic max-w-xl mx-auto">
            {t('booking.subtitle')}
          </p>
        </div>

        <BookingForm roomData={selectedRoom} />
      </div>
    </div>
  );
};

export default BookingPage;
