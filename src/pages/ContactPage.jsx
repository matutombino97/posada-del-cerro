import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Contact from '../features/contact/components/Contact';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 bg-[#F4ECD8] min-h-screen">
      <Helmet>
        <title>{t('navbar.contact')} | La Posada del Cerro Mendoza</title>
        <meta name="description" content="¿Tienes dudas? Ponte en contacto con nosotros. Estamos en el corazón de Luján de Cuyo, Mendoza." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="text-6xl font-serif text-primary-brown mb-6">{t('navbar.contact')}</h1>
        <p className="text-primary-brown/60 italic max-w-2xl mx-auto text-lg font-light">
          {t('blog.subtitle') || 'Estamos aquí para responder tus dudas y ayudarte a planificar la mejor estadía en Mendoza.'}
        </p>
      </div>
      <Contact />
      
      {/* Optional: Map Section */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
         <div className="h-[450px] bg-white rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107142.12328249!2d-68.9100588!3d-32.9463032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967df00000000001%3A0x1d1d1d1d1d1d1d1d!2sLujan%20de%20Cuyo%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Ubicación La Posada del Cerro"
            ></iframe>
         </div>
      </div>
    </div>
  );
};

export default ContactPage;
