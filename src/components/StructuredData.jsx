import { Helmet } from 'react-helmet-async';

/**
 * Componente para agregar structured data (JSON-LD) a la página
 * Ayuda al SEO y a que los buscadores entiendan mejor el contenido
 */
export const StructuredData = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

/**
 * Schema para Hotel/Hostel
 */
export const hotelSchema = {
  "@context": "https://schema.org/",
  "@type": "Hotel",
  "name": "La Posada del Cerro",
  "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
  "description": "Hostería boutique en el corazón de Mendoza. Experiencia rústica-elegante entre viñedos y montañas.",
  "url": "https://laposadadelcerro.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle de los Viñedos 1234",
    "addressLocality": "Luján de Cuyo",
    "addressRegion": "Mendoza",
    "postalCode": "5507",
    "addressCountry": "AR"
  },
  "telephone": "+54 9 261 343 3108",
  "email": "info@laposadadelcerro.com",
  "sameAs": [
    "https://www.instagram.com/laposadadelcerro",
    "https://www.facebook.com/laposadadelcerro"
  ],
  "rating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "247"
  },
  "priceRange": "$$",
  "checkInTime": "15:00",
  "checkOutTime": "11:00"
};

/**
 * Schema para LocalBusiness (si lo necesitas)
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://laposadadelcerro.com",
  "name": "La Posada del Cerro",
  "url": "https://laposadadelcerro.com",
  "logo": "https://laposadadelcerro.com/logo.png",
  "description": "Hostería boutique en Mendoza con experiencia de lujo asequible",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle de los Viñedos 1234",
    "addressLocality": "Luján de Cuyo",
    "addressRegion": "Mendoza",
    "postalCode": "5507",
    "addressCountry": "AR"
  },
  "telephone": "+54 9 261 343 3108",
  "email": "info@laposadadelcerro.com",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
};
