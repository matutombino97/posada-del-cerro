import { useState, useEffect } from 'react';
import { db, storage } from '../../../services/firebase';
import { collection, query, onSnapshot, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const openModal = (post = null) => {
    setEditingPost(post);
    if (post) {
      reset(post);
    } else {
      reset({ title: '', summary: '', content: '', category: 'Turismo' });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = data.image || '';
      if (imageFile) {
        const storageRef = ref(storage, `blog/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const postData = { 
        ...data, 
        image: imageUrl,
        updatedAt: serverTimestamp()
      };

      if (!editingPost) {
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'blog'), postData);
      } else {
        await updateDoc(doc(db, 'blog', editingPost.id), postData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-primary-brown mb-2">Administración del Blog</h1>
          <p className="text-gray-400">Publica noticias, guías y novedades para tus huéspedes.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-primary-brown text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-opacity-90 transition-all"
        >
          <Plus className="w-5 h-5 mr-2" /> Nueva Entrada
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Título</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Categoría</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Fecha</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-primary-beige/5">
                <td className="px-6 py-4 font-bold text-gray-800">{post.title}</td>
                <td className="px-6 py-4"><span className="bg-primary-olive/10 text-primary-olive px-3 py-1 rounded-full text-xs font-bold">{post.category}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                <td className="px-6 py-4">
                   <div className="flex space-x-2">
                      <button onClick={() => openModal(post)} className="p-2 text-primary-brown hover:bg-primary-beige/10 rounded-lg"><Edit2 size={18} /></button>
                      <button onClick={async () => { if(window.confirm('¿Eliminar post?')) await deleteDoc(doc(db, 'blog', post.id)) }} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
            <div className="p-6 bg-primary-brown text-white flex justify-between items-center">
              <h2 className="text-2xl font-serif text-white">{editingPost ? 'Editar Entrada' : 'Nueva Entrada'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/10 p-1 rounded text-white"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                <input {...register('title', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
                  <select {...register('category')} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none">
                     <option>Turismo</option>
                     <option>Gastronomía</option>
                     <option>Actividades</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Imagen de Portada</label>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="text-xs" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Resumen (Preview)</label>
                <textarea rows="2" {...register('summary', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Contenido Completo (HTML/Texto)</label>
                <textarea rows="10" {...register('content', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none font-mono text-sm" />
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-lg">Cancelar</button>
                <button type="submit" disabled={loading} className="px-8 py-3 bg-primary-brown text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90 flex items-center disabled:opacity-50">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                  Publicar Entrada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
