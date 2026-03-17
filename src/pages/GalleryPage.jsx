import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Gallery from '../features/gallery/components/Gallery';

const GalleryPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 bg-[#F4ECD8] min-h-screen">
      <Helmet>
        <title>{t('gallery.title')} | La Posada del Cerro</title>
        <meta name="description" content="Descubre la belleza de nuestra posada en Mendoza a través de nuestra galería de fotos." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl font-serif text-primary-brown mb-4 text-center">{t('gallery.title')}</h1>
        <p className="text-primary-brown/60 italic text-center mb-16 max-w-2xl mx-auto font-light">
          {t('gallery.subtitle')}
        </p>
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;
