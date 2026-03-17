import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { db, isDemoMode } from '../services/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { MOCK_BLOG } from '../services/mockData';

const BlogPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      setPosts(MOCK_BLOG);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const firestorePosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (firestorePosts.length > 0) {
          setPosts(firestorePosts);
        } else {
          setPosts(MOCK_BLOG);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore error in blog, using mock data:", error);
        setPosts(MOCK_BLOG);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4ECD8]">
        <Helmet>
          <title>Cargando Blog... | La Posada del Cerro</title>
        </Helmet>
        <Loader2 className="w-12 h-12 text-primary-brown animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#F4ECD8] min-h-screen">
      <Helmet>
        <title>{t('blog.title')} | Historias y Guías de Mendoza</title>
        <meta name="description" content="Descubre los mejores secretos de Mendoza: bodegas, montañas y la vida en La Posada del Cerro." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl font-serif text-primary-brown mb-12 text-center">{t('blog.title')}</h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm">
             <p className="text-gray-400 italic">{t('blog.noPosts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group">
                <div className="h-64 overflow-hidden mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-primary-olive/10 text-primary-olive px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest leading-none">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                       <Calendar className="w-4 h-4 mr-2" /> 
                       {post.createdAt?.toDate 
                         ? format(post.createdAt.toDate(), 'dd MMM, yyyy') 
                         : post.date || 'Reciente'}
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif text-primary-brown mb-4">{post.title}</h3>
                  <p className="text-gray-600 mb-6">{post.summary}</p>
                  <Link to={`/blog/${post.id}`} className="text-primary-brown font-bold flex items-center hover:text-primary-olive transition-colors">
                    {t('blog.readMore')} <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
