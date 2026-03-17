import { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../../services/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ name: '', email: '', comment: '', rating: 5 });
  const [status, setStatus] = useState('idle'); // idle, loading, success

  useEffect(() => {
    const q = query(
      collection(db, 'reseñas'), 
      where('approved', '==', true),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Wait, setImages? No, setReviews.
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    setStatus('loading');
    try {
      await addDoc(collection(db, 'reseñas'), {
        ...newReview,
        approved: false,
        createdAt: serverTimestamp(),
        photo: `https://i.pravatar.cc/150?u=${newReview.email}`
      });
      setStatus('success');
      setNewReview({ name: '', email: '', comment: '', rating: 5 });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setStatus('idle');
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : "5.0";

  return (
    <section id="reviews" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 reveal">
        <h2 className="text-4xl md:text-5xl font-serif text-primary-brown mb-6">Lo que dicen nuestros huéspedes</h2>
        <div className="w-24 h-1 bg-primary-olive mx-auto mb-10" />
        <div className="flex items-center justify-center space-x-2 text-2xl font-serif text-primary-brown">
          <span className="font-bold">{averageRating}</span>
          <div className="flex text-yellow-500">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-6 h-6 ${i <= Math.round(averageRating) ? 'fill-current' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-gray-400 text-sm font-sans">({reviews.length} reseñas)</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary-brown animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reviews.map(review => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-primary-beige/20 flex flex-col h-full"
            >
              <div className="flex items-center mb-6">
                <img src={review.photo} alt={review.name} className="w-12 h-12 rounded-full mr-4 border-2 border-primary-beige" />
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed flex-grow">"{review.comment}"</p>
            </motion.div>
          ))}
          {reviews.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400 italic">
               Aún no hay reseñas. ¡Sé el primero en comentar!
            </div>
          )}
        </div>
      )}

      {/* Leave a review form */}
      <div className="max-w-2xl mx-auto bg-primary-beige/5 p-10 rounded-3xl border border-primary-beige/20">
        <h3 className="text-2xl font-serif text-primary-brown mb-8 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 mr-3 text-primary-olive" />
          Deja tu comentario
        </h3>
        
        {status === 'success' ? (
          <div className="text-center py-10 flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-primary-brown font-bold text-lg">¡Gracias por tu reseña!</p>
            <p className="text-gray-500 text-sm mt-2">Será visible una vez que sea moderada.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                placeholder="Nombre" 
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                required
                className="w-full bg-white border-b border-gray-200 py-3 px-4 focus:outline-none focus:border-primary-brown" 
              />
              <input 
                type="email"
                placeholder="Email" 
                value={newReview.email}
                onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                required
                className="w-full bg-white border-b border-gray-200 py-3 px-4 focus:outline-none focus:border-primary-brown" 
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm font-bold uppercase">Tu puntuación:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <button type="button" key={i} onClick={() => setNewReview({...newReview, rating: i})}>
                      <Star className={`w-6 h-6 ${i <= newReview.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>
            <textarea 
              placeholder="Tu experiencia..." 
              rows="4" 
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              required
              className="w-full bg-white border-b border-gray-200 py-3 px-4 focus:outline-none focus:border-primary-brown"
            ></textarea>
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-primary-brown text-white px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center mx-auto disabled:opacity-50"
            >
              {status === 'loading' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              Enviar Reseña
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Reviews;
