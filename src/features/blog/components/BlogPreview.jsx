import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';

const BlogPreview = () => {
  const posts = [
    {
      id: 1,
      title: "Ruta del Vino: Los Mejores Viñedos en Luján de Cuyo",
      summary: "Descubre la magia de las bodegas mendocinas y la pasión por el Malbec en esta guía completa.",
      date: "10 Marzo, 2026",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b0bc7ef?q=80&w=2070&auto=format&fit=crop",
      category: "Turismo"
    },
    {
      id: 2,
      title: "Gastronomía de Montaña: Sabores Auténticos",
      summary: "Desde el chivo al asador hasta las empanadas mendocinas, un recorrido por nuestra cocina.",
      date: "05 Marzo, 2026",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      category: "Gastronomía"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-serif text-primary-brown mb-6">Nuestro Blog</h2>
            <div className="w-24 h-1 bg-primary-olive mb-6" />
            <p className="text-gray-500 italic">Historias y guías para vivir Mendoza al máximo.</p>
          </div>
          <Link to="/blog" className="mt-8 md:mt-0 text-primary-olive font-bold flex items-center hover:text-primary-brown transition-colors">
            Ver todas las entradas <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map(post => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative h-80 overflow-hidden rounded-[2.5rem] mb-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute top-6 left-6 bg-primary-olive text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  {post.category}
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center text-gray-400 text-xs mb-4 font-bold uppercase tracking-[0.2em]">
                  <Calendar className="w-4 h-4 mr-2 text-primary-olive" /> {post.date}
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-primary-brown mb-4 group-hover:text-primary-olive transition-colors leading-tight">{post.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">{post.summary}</p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-primary-brown font-black uppercase text-sm tracking-widest hover:text-primary-olive transition-colors group/link">
                  <span className="border-b-2 border-primary-beige group-hover/link:border-primary-olive pb-1">Continuar leyendo</span>
                  <ChevronRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
