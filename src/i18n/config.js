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
        welcome: "Boutique Excellence",
        title: "La Posada del Cerro",
        subtitle: "Boutique Experience in the heart of Mendoza",
        cta: "Explore Our Rooms",
        experience: "Explore the Experience"
      },
      welcome: {
        subtitle: "Our Story",
        title: "Welcome to La Posada del Cerro",
        p1: "Located in the beating heart of Mendoza, our boutique inn is the ideal retreat for those looking to disconnect without giving up elegance.",
        p2: "We offer curated experiences that combine Mendoza tradition with modern comfort, surrounded by the most inspiring landscapes of the foothills."
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
        contactUs: "Contact us directly for availability.",
        roomsDesc: "Our boutique rooms combine luxury, comfort and the best views of the Mendoza foothills."
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
        subtitle: "We're here to answer your questions and help you plan the perfect stay in Mendoza.",
        successMsg: "Thanks for contacting us. We will get back to you soon.",
        sendAnother: "Send another message",
        formTitle: "Send us a message",
        name: "Name",
        message: "Message"
      },
      booking: {
        title: "Plan Your Stay",
        subtitle: "Complete the form and we will contact you to confirm availability and details of your arrival.",
        formHeader: "Stay Details",
        checkIn: "Check-in",
        checkOut: "Check-out",
        guests: "Guests",
        calculating: "Consulting availability...",
        available: "Suite Available",
        notAvailable: "No availability",
        fullName: "Full Name",
        email: "Contact Email",
        total: "Final Investment",
        submit: "Request Boutique Reservation",
        successHeader: "Reservation Received!",
        successText: "We have received your request. A concierge from La Posada del Cerro will contact you at {{email}} shortly.",
        backToHome: "Back to Home",
        errorDate: "Departure date must be after arrival date"
      },
      promotions: {
        headerBadge: "Exclusive Offers",
        headerTitle: "Promotions",
        headerSubtitle: "Take advantage of our special offers and live the boutique experience of Mendoza at a preferential price.",
        priceText: "Access to"
      },
      welcome: {
        subtitle: "Our Story",
        titlePrefix: "Welcome to",
        titleSpan: "La Posada",
        titleSuffix: "del Cerro",
        callUs: "Call us",
        writeUs: "Write us",
        visitUs: "Visit us",
        reserveWA: "Reserve via WhatsApp",
        consultEmail: "Consult via Email"
      },
      cta: {
        somethingSpecial: "Looking for something special?",
        specialDesc: "Contact us for private events, corporate retreats or extended stays with exclusive discounts.",
        consultWA: "Consult us via WhatsApp"
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
        welcome: "Bienvenidos a la Excelencia",
        title: "La Posada del Cerro",
        subtitle: "Experiencia Boutique en el corazón de Mendoza",
        cta: "Explora Nuestras Habitaciones",
        experience: "Explora la Experiencia"
      },
      welcome: {
        subtitle: "Nuestra Historia",
        title: "Bienvenido a La Posada del Cerro",
        p1: "Ubicada en el corazón latente de Mendoza, nuestra posada boutique es el refugio ideal para quienes buscan desconectar sin renunciar a la elegancia.",
        p2: "Ofrecemos experiencias curadas que combinan la tradición mendocina con el confort moderno, rodeados de los paisajes más inspiradores de la precordillera."
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
        contactUs: "Contactanos directamente para consultar disponibilidad.",
        roomsDesc: "Nuestras habitaciones boutique combinan lujo, confort y las mejores vistas de la cordillera mendocina."
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
        subtitle: "Estamos aquí para responder tus dudas y ayudarte a planificar la mejor estadía en Mendoza.",
        successMsg: "Gracias por contactarnos. Te responderemos a la brevedad.",
        sendAnother: "Enviar otro mensaje",
        formTitle: "Envíanos un mensaje",
        name: "Nombre",
        message: "Mensaje"
      },
      booking: {
        title: "Planifica tu Estadía",
        subtitle: "Completa el formulario y nos pondremos en contacto para confirmar la disponibilidad y los detalles de tu llegada.",
        formHeader: "Detalles de tu Estancia",
        checkIn: "Check-in",
        checkOut: "Check-out",
        guests: "Huéspedes",
        calculating: "Consultando disponibilidad...",
        available: "Suite Disponible",
        notAvailable: "Sin disponibilidad",
        fullName: "Nombre Completo",
        email: "Correo de Contacto",
        total: "Inversión Final",
        submit: "Solicitar Reserva Boutique",
        successHeader: "¡Reserva Recibida!",
        successText: "Hemos recibido tu solicitud. Un conserje de La Posada del Cerro se pondrá en contacto contigo a {{email}} a la brevedad.",
        backToHome: "Volver al Inicio",
        errorDate: "La fecha de salida debe ser posterior a la de entrada"
      },
      promotions: {
        headerBadge: "Ofertas Exclusivas",
        headerTitle: "Promociones",
        headerSubtitle: "Aprovecha nuestras ofertas especiales y vive la experiencia boutique de Mendoza a un precio preferencial.",
        priceText: "Accede a"
      },
      welcome: {
        subtitle: "Nuestra Historia",
        titlePrefix: "Bienvenido a",
        titleSpan: "La Posada",
        titleSuffix: "del Cerro",
        callUs: "Llámanos",
        writeUs: "Escríbenos",
        visitUs: "Visítanos",
        reserveWA: "Reservar por WhatsApp",
        consultEmail: "Consultar por Email"
      },
      cta: {
        somethingSpecial: "¿Buscás algo especial?",
        specialDesc: "Contactanos para eventos privados, retiros corporativos o estadías prolongadas con descuentos exclusivos.",
        consultWA: "Consúltanos por Whatsapp"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
