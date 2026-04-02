import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { db, isDemoMode } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MOCK_BLOG } from '../services/mockData';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (isDemoMode) {
        const mockPost = MOCK_BLOG.find(p => p.id === id);
        setPost(mockPost || null);
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'blog', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback to mock data if not found in Firestore
          const mockPost = MOCK_BLOG.find(p => p.id === id);
          if (mockPost) setPost(mockPost);
        }
      } catch (error) {
        console.warn("Firestore error, using mock data:", error);
        const mockPost = MOCK_BLOG.find(p => p.id === id);
        if (mockPost) setPost(mockPost);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4ECD8]">
        <Helmet>
          <title>Blog | La Posada del Cerro</title>
        </Helmet>
        <Loader2 className="w-12 h-12 text-primary-brown animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4ECD8]">
        <h2 className="text-3xl font-serif text-primary-brown mb-4">Artículo no encontrado</h2>
        <Link to="/blog" className="text-primary-brown font-bold hover:underline">Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#F4ECD8] min-h-screen">
      <Helmet>
        <title>{post.title} | Blog La Posada</title>
        <meta name="description" content={post.summary || "Explora más sobre Mendoza en nuestro blog boutique."} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/blog" className="flex items-center text-primary-brown font-bold mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver al blog
        </Link>
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl p-8 md:p-16">
          <img src={post.image} className="w-full h-[400px] object-cover rounded-3xl mb-12" alt={post.title} />
          <div className="flex items-center text-gray-400 text-sm mb-6">
            <Calendar className="w-4 h-4 mr-2" /> 
            {post.createdAt?.toDate 
              ? format(post.createdAt.toDate(), 'dd MMM, yyyy') 
              : post.date || 'Reciente'}
          </div>
          <h1 className="text-5xl font-serif text-primary-brown mb-10 leading-tight">{post.title}</h1>
          <div 
            className="prose prose-lg text-gray-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
