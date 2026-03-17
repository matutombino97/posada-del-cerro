import { useState, useEffect } from 'react';
import { db, storage } from '../../../services/firebase';
import { collection, query, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'habitaciones'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const openModal = (room = null) => {
    setEditingRoom(room);
    if (room) {
      reset(room);
    } else {
      reset({ name: '', price: '', capacity: '', bedType: '', description: '', published: true });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = data.image || '';

      if (imageFile) {
        const storageRef = ref(storage, `rooms/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const roomData = { ...data, image: imageUrl };

      if (editingRoom) {
        await updateDoc(doc(db, 'habitaciones', editingRoom.id), roomData);
      } else {
        await addDoc(collection(db, 'habitaciones'), roomData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving room:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta habitación?')) {
      await deleteDoc(doc(db, 'habitaciones', id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-primary-brown mb-2">Gestión de Habitaciones</h1>
          <p className="text-gray-400">Crea y edita la oferta de alojamiento de la hostería.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-primary-brown text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-opacity-90 transition-all"
        >
          <Plus className="w-5 h-5 mr-2" /> Nueva Habitación
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 relative">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              {!room.published && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold uppercase tracking-widest text-sm">No Publicada</div>}
            </div>
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-serif text-primary-brown font-bold">{room.name}</h3>
                <span className="text-primary-olive font-bold text-lg">${room.price}</span>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2 mb-6">{room.description}</p>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-50">
                <button onClick={() => openModal(room)} className="p-2 text-primary-brown hover:bg-primary-beige/10 rounded-lg transition-colors"><Edit2 size={18} /></button>
                <button onClick={() => deleteRoom(room.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-primary-brown text-white flex justify-between items-center">
              <h2 className="text-2xl font-serif">{editingRoom ? 'Editar Habitación' : 'Nueva Habitación'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/10 p-1 rounded"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                  <input {...register('name', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Precio por Noche</label>
                  <input type="number" {...register('price', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Capacidad</label>
                  <input type="number" {...register('capacity', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Tipo de Cama</label>
                  <input {...register('bedType', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Descripción</label>
                <textarea rows="3" {...register('description', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary-brown focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Imagen</label>
                <div className="mt-1 flex items-center">
                  {imageFile || editingRoom?.image ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden mr-4 shadow-md">
                      <img src={imageFile ? URL.createObjectURL(imageFile) : editingRoom.image} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setImageFile(null)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"><X size={12} /></button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center mr-4 text-gray-400 border-2 border-dashed border-gray-200">
                      <ImageIcon />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="text-sm" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-500 uppercase">Comodidades (Amenities)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['wifi', 'ac', 'tv', 'coffee', 'breakfast', 'pool', 'kitchen'].map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input 
                        type="checkbox" 
                        value={amenity}
                        {...register('amenities')}
                        className="w-4 h-4 text-primary-brown rounded"
                      />
                      <span className="text-sm text-gray-700 capitalize">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" {...register('published')} id="published" className="w-4 h-4 text-primary-brown" />
                <label htmlFor="published" className="text-sm font-bold text-gray-600">Publicado y Disponible</label>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-lg">Cancelar</button>
                <button type="submit" disabled={loading} className="px-8 py-3 bg-primary-brown text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90 flex items-center disabled:opacity-50">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                  Guardar Habitación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
