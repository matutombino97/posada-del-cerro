import { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Mail, Clock, Trash2, User, MessageSquare, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'mensajes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const deleteMessage = async (id) => {
    if (window.confirm('¿Eliminar este mensaje?')) {
      await deleteDoc(doc(db, 'mensajes', id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-primary-brown mb-2">Mensajes de Contacto</h1>
        <p className="text-gray-400">Consultas y mensajes recibidos a través de la web.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl text-center text-gray-400 italic border border-gray-100 shadow-sm">
            No has recibido mensajes aún.
          </div>
        ) : messages.map(msg => (
          <div key={msg.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group relative">
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-beige/20 rounded-2xl flex items-center justify-center mr-4">
                  <User className="text-primary-brown" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{msg.name}</h4>
                  <p className="text-sm text-gray-400 flex items-center italic">
                    <Mail className="w-3 h-3 mr-1" /> {msg.email}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center justify-end">
                  <Clock className="w-3 h-3 mr-1" /> 
                  {msg.createdAt?.seconds ? format(msg.createdAt.toDate(), 'dd/MM/yyyy HH:mm') : 'Recientemente'}
                </span>
                <button 
                  onClick={() => deleteMessage(msg.id)}
                  className="mt-2 text-red-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
            </div>
            <a 
                href={`mailto:${msg.email}`}
                className="mt-6 inline-flex items-center text-primary-olive font-bold text-sm hover:text-primary-brown transition-colors"
            >
                <MessageSquare className="w-4 h-4 mr-2" /> Responder por Email
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
