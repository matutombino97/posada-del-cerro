import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Instagram, Facebook, Send, CheckCircle, Loader2, Calendar } from 'lucide-react';
import { db } from '../../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await addDoc(collection(db, 'mensajes'), {
        ...data,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Info Side */}
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-serif text-primary-brown mb-8">{t('navbar.contact')}</h2>
            <div className="w-24 h-1 bg-primary-olive mb-10" />
            <p className="text-gray-600 text-lg mb-12 italic leading-relaxed font-light">
              {t('blog.subtitle')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm mr-6 text-primary-olive border border-primary-olive/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-primary-brown mb-1 uppercase text-[10px] tracking-[0.2em]">{t('contact.location') || 'Ubicación'}</h4>
                  <p className="text-gray-500 font-light italic">Calle de los Viñedos 1234, Luján de Cuyo, Mendoza, Argentina</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm mr-6 text-primary-olive border border-primary-olive/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-primary-brown mb-1 uppercase text-[10px] tracking-[0.2em]">{t('contact.phone') || 'Teléfono / WhatsApp'}</h4>
                  <p className="text-gray-500 font-light italic">Recepción: +54 9 261 343 3108</p>
                  <p className="text-gray-500 font-light italic">Reservas: +54 9 261 987 6543</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm mr-6 text-primary-olive border border-primary-olive/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-primary-brown mb-1 uppercase text-[10px] tracking-[0.2em]">Email</h4>
                  <p className="text-gray-500 font-light italic">reservas@laposadadelcerro.com</p>
                  <p className="text-gray-500 font-light italic">eventos@laposadadelcerro.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm mr-6 text-primary-olive border border-primary-olive/10">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-primary-brown mb-1 uppercase text-[10px] tracking-[0.2em]">Horarios de Atención</h4>
                  <p className="text-gray-500 font-light italic">Check-in: 14:00 - 20:00</p>
                  <p className="text-gray-500 font-light italic">Check-out: 08:00 - 11:00</p>
                  <p className="text-gray-500 font-light italic">Recepción: 24 hs</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-primary-beige/30">
                <h4 className="font-black text-primary-brown mb-6 uppercase text-[10px] tracking-[0.3em]">{t('contact.social') || 'Síguenos en las redes'}</h4>
                <div className="flex space-x-6">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-3xl shadow-sm text-primary-olive hover:bg-primary-olive hover:text-white transition-all transform hover:scale-110 active:scale-95">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-3xl shadow-sm text-primary-olive hover:bg-primary-olive hover:text-white transition-all transform hover:scale-110 active:scale-95">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-primary-beige/10 reveal">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500">
                 <div className="bg-green-50 p-6 rounded-full mb-8">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                 </div>
                 <h3 className="text-4xl font-serif text-primary-brown mb-4 italic">¡{t('reviews.thanks')}!</h3>
                 <p className="text-gray-500 mb-10 font-light italic">{t('contact.successMsg') || 'Gracias por contactarnos. Te responderemos a la brevedad.'}</p>
                 <button 
                  onClick={() => setStatus('idle')}
                  className="bg-primary-brown text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-primary-olive transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                 >
                   {t('contact.sendAnother') || 'Enviar otro mensaje'}
                 </button>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-serif text-primary-brown mb-10 text-center italic">{t('contact.formTitle') || 'Envíanos un mensaje'}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-olive uppercase tracking-[0.3em] px-1">{t('contact.name') || 'Nombre'}</label>
                    <input 
                      {...register('name', { required: true })}
                      placeholder="Tu nombre completo"
                      className="w-full bg-primary-beige/5 border-b-2 border-primary-olive/10 py-4 px-1 focus:outline-none focus:border-primary-brown transition-colors font-light text-primary-brown" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-olive uppercase tracking-[0.3em] px-1">Email</label>
                    <input 
                      type="email"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="email@ejemplo.com"
                      className="w-full bg-primary-beige/5 border-b-2 border-primary-olive/10 py-4 px-1 focus:outline-none focus:border-primary-brown transition-colors font-light text-primary-brown" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-olive uppercase tracking-[0.3em] px-1">{t('contact.message') || 'Mensaje'}</label>
                    <textarea 
                      rows="4" 
                      {...register('message', { required: true })}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full bg-primary-beige/5 border-b-2 border-primary-olive/10 py-4 px-1 focus:outline-none focus:border-primary-brown transition-colors font-light text-primary-brown resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={status === 'loading'}
                    className="w-full bg-primary-brown text-white py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center hover:bg-primary-olive shadow-[0_20px_50px_rgba(58,41,23,0.2)] hover:shadow-primary-olive/30 transition-all transform hover:scale-[1.05] active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin mr-4" /> : <Send className="w-5 h-5 mr-4" />}
                    {status === 'loading' ? '...' : t('reviews.send')}
                  </button>
                  {status === 'error' && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center mt-4">Hubo un error. Intenta de nuevo.</p>}
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
