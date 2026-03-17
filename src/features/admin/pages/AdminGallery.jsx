import { useState, useEffect } from 'react';
import { db, storage } from '../../../services/firebase';
import { collection, query, onSnapshot, doc, addDoc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Trash2, ImageIcon, Loader2, X } from 'lucide-react';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('habitaciones');

  useEffect(() => {
    const q = query(collection(db, 'galeria'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `galeria/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'galeria'), {
        url,
        category,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (window.confirm('¿Eliminar esta imagen de la galería?')) {
      await deleteDoc(doc(db, 'galeria', id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-primary-brown mb-2">Editor de Galería</h1>
        <p className="text-gray-400">Sube y organiza fotos por categorías.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Categoría:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="bg-primary-beige/5 border border-primary-beige/20 rounded-xl px-4 py-2 focus:outline-none focus:border-primary-brown"
          >
            <option value="habitaciones">Habitaciones</option>
            <option value="espacios">Espacios Comunes</option>
            <option value="jardin">Jardín</option>
            <option value="desayuno">Desayuno</option>
          </select>
        </div>

        <label className="relative cursor-pointer bg-primary-brown text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-opacity-90 transition-all">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
          {uploading ? 'Subiendo...' : 'Subir Imagen'}
          <input type="file" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden shadow-sm">
            <img src={img.url} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 bg-black/50 text-[10px] text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {img.category}
            </div>
            <button 
              onClick={() => deleteImage(img.id)}
              className="absolute inset-0 bg-red-600/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
