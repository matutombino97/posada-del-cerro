import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Loader2 } from 'lucide-react';
import { db, isDemoMode } from '../../../services/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { MOCK_GALLERY } from '../../../services/mockData';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const Gallery = () => {
  const { t } = useTranslation();
  useScrollReveal();
  const [selectedImg, setSelectedImg] = useState(null);
  const [filter, setFilter] = useState('all');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: t('gallery.all') },
    { id: 'habitaciones', name: t('gallery.rooms') },
    { id: 'espacios', name: t('gallery.spaces') },
    { id: 'jardin', name: t('gallery.garden') },
    { id: 'desayuno', name: t('gallery.breakfast') }
  ];

  useEffect(() => {
    if (isDemoMode) {
      setImages(MOCK_GALLERY);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'galeria'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const firestoreImages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (firestoreImages.length > 0) {
          setImages(firestoreImages);
        } else {
          setImages(MOCK_GALLERY);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore error, falling back to mock data:", error);
        setImages(MOCK_GALLERY);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  if (loading) {
    return (
      <div className="py-32 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-brown animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-24" id="gallery">
      <Helmet>
        <title>{t('navbar.gallery')} | La Posada del Cerro Mendoza</title>
        <meta name="description" content="Explora nuestra galería de fotos: habitaciones, espacios comunes, jardines y desayunos en Mendoza." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-serif text-primary-brown mb-6">{t('navbar.gallery')}</h2>
          <div className="w-24 h-1 bg-primary-olive mx-auto mb-10" />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 transform hover:scale-110 active:scale-90 cursor-pointer ${
                  filter === cat.id 
                    ? 'bg-primary-brown text-white shadow-2xl ring-4 ring-primary-brown/10' 
                    : 'bg-primary-beige/30 text-gray-400 hover:text-primary-brown hover:bg-white border border-gray-100 shadow-sm hover:shadow-xl'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Masonry-like */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-primary-brown/10">
            <p className="text-gray-400 italic">{t('gallery.noImages') || 'No hay fotos en esta categoría aún.'}</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredImages.map(img => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={img.id}
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedImg(img.url)}
                >
                  <img src={img.url} alt="Gallery item" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-primary-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <div className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      <Maximize2 className="text-white w-8 h-8" />
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary-brown/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-primary-olive transition-all transform hover:rotate-90 hover:scale-125 cursor-pointer z-[110]">
              <X className="w-12 h-12" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Full size"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
