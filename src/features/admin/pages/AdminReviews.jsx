import { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { Star, Check, X, Trash2, MessageSquare, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'reseñas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const setApproval = async (id, approved) => {
    await updateDoc(doc(db, 'reseñas', id), { approved });
  };

  const deleteReview = async (id) => {
    if (window.confirm('¿Eliminar esta reseña permanentemente?')) {
      await deleteDoc(doc(db, 'reseñas', id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-primary-brown mb-2">Moderación de Reseñas</h1>
        <p className="text-gray-400">Aprueba o rechaza los comentarios antes de que aparezcan en el sitio.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl text-center text-gray-400 italic border border-gray-100 shadow-sm">
            No hay reseñas para moderar en este momento.
          </div>
        ) : reviews.map(review => (
          <div key={review.id} className={clsx(
            "bg-white p-6 rounded-3xl shadow-sm border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all",
            review.approved === false ? "border-amber-200 bg-amber-50/10" : "border-gray-100"
          )}>
            <div className="flex-grow">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-500 mr-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={14} className={i <= review.rating ? 'fill-current' : 'text-gray-200'} />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{review.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {review.createdAt?.seconds ? format(review.createdAt.toDate(), 'dd/MM/yyyy HH:mm') : 'Recientemente'}
                  </span>
                </div>
                {review.approved === false && (
                  <span className="ml-4 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ring-1 ring-amber-200">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
              <p className="text-[10px] text-gray-400 mt-2">{review.email}</p>
            </div>

            <div className="flex items-center space-x-3">
              {review.approved !== true && (
                <button 
                  onClick={() => setApproval(review.id, true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold uppercase transition-all flex items-center shadow-lg hover:shadow-green-200"
                >
                  <Check size={14} className="mr-2" /> Aprobar
                </button>
              )}
              {review.approved !== false && (
                <button 
                  onClick={() => setApproval(review.id, false)}
                  className="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl text-xs font-bold uppercase transition-all flex items-center hover:bg-amber-600 hover:text-white"
                >
                  <X size={14} className="mr-2" /> Rechazar
                </button>
              )}
              <button 
                onClick={() => deleteReview(review.id)}
                className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
