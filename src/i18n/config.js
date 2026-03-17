import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        rooms: "Rooms",
        services: "Our Services",
        promotions: "Promotions",
        events: "Events",
        gallery: "Gallery",
        blog: "Blog",
        contact: "Contact",
        reserve: "Reserve Now"
      },
      hero: {
        title: "La Posada del Cerro",
        subtitle: "Boutique Experience in the heart of Mendoza",
        cta: "Explore Our Rooms"
      },
      rooms: {
        title: "Our Rooms",
        subtitle: "Comfort and Style in every detail",
        viewDetail: "View Detail",
        from: "from",
        perNight: "per night",
        capacity: "Capacity",
        amenities: "Amenities",
        noRooms: "No rooms available at the moment.",
        contactUs: "Contact us directly for availability."
      },
      blog: {
        title: "Our Blog",
        subtitle: "News, guides and tips for your stay",
        readMore: "Read More",
        noPosts: "No posts found."
      },
      gallery: {
        title: "Our Gallery",
        subtitle: "A visual journey through our spaces, rooms, and the natural environment of the Andes.",
        all: "All",
        rooms: "Rooms",
        spaces: "Common Spaces",
        garden: "Garden",
        breakfast: "Breakfast",
        noImages: "No photos in this category yet."
      },
      reviews: {
        title: "What our guests say",
        leaveReview: "Leave a review",
        send: "Send Review",
        thanks: "Thanks for your review!",
        pending: "It will be visible once moderated."
      },
      amenities: {
        wifi: "Free Wi-Fi",
        ac: "Air Conditioning",
        tv: "Satellite TV",
        coffee: "Coffee Machine",
        breakfast: "Breakfast Included",
        pool: "Swimming Pool"
      },
      contact: {
        location: "Location",
        phone: "Phone / WhatsApp",
        social: "Follow us",
        successMsg: "Thanks for contacting us. We will get back to you soon.",
        sendAnother: "Send another message",
        formTitle: "Send us a message",
        name: "Name",
        message: "Message"
      }
    }
  },
  es: {
    translation: {
      navbar: {
        home: "Inicio",
        rooms: "Habitaciones",
        services: "Nuestros Servicios",
        promotions: "Promociones",
        events: "Eventos",
        gallery: "Galería",
        blog: "Blog",
        contact: "Contacto",
        reserve: "Reservar Ahora"
      },
      hero: {
        title: "La Posada del Cerro",
        subtitle: "Experiencia Boutique en el corazón de Mendoza",
        cta: "Explora Nuestras Habitaciones"
      },
      rooms: {
        title: "Nuestras Habitaciones",
        subtitle: "Confort y estilo en cada detalle",
        viewDetail: "Ver Detalle",
        from: "desde",
        perNight: "por noche",
        capacity: "Capacidad",
        amenities: "Servicios",
        noRooms: "No hay habitaciones disponibles en este momento.",
        contactUs: "Contactanos directamente para consultar disponibilidad."
      },
      blog: {
        title: "Nuestro Blog",
        subtitle: "Noticias, guías y tips para tu estadía",
        readMore: "Leer Más",
        noPosts: "No se encontraron entradas."
      },
      gallery: {
        title: "Nuestra Galería",
        subtitle: "Un recorrido visual por nuestros espacios, habitaciones y el entorno natural de la Cordillera.",
        all: "Todo",
        rooms: "Habitaciones",
        spaces: "Espacios Comunes",
        garden: "Jardín",
        breakfast: "Desayuno",
        noImages: "No hay fotos en esta categoría aún."
      },
      reviews: {
        title: "Lo que dicen nuestros huéspedes",
        leaveReview: "Deja tu comentario",
        send: "Enviar Reseña",
        thanks: "¡Gracias por tu reseña!",
        pending: "Será visible una vez que sea moderada."
      },
      amenities: {
        wifi: "Wi-Fi Gratis",
        ac: "Aire Acondicionado",
        tv: "TV Satelital",
        coffee: "Cafetera",
        breakfast: "Desayuno Incluido",
        pool: "Piscina"
      },
      contact: {
        location: "Ubicación",
        phone: "Teléfono / WhatsApp",
        social: "Síguenos en redes",
        successMsg: "Gracias por contactarnos. Te responderemos a la brevedad.",
        sendAnother: "Enviar otro mensaje",
        formTitle: "Envíanos un mensaje",
        name: "Nombre",
        message: "Mensaje"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
