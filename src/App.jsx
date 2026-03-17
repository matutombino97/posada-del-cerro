import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoomDetail from './features/rooms/pages/RoomDetail';
import BookingPage from './features/bookings/pages/BookingPage';
import RoomsPage from './features/rooms/pages/RoomsPage';
import ServicesPage from './pages/ServicesPage';
import PromotionsPage from './pages/PromotionsPage';
import EventsPage from './pages/EventsPage';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './features/admin/pages/AdminLogin';
import AdminLayout from './features/admin/components/AdminLayout';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import AdminBookings from './features/admin/pages/AdminBookings';
import AdminRooms from './features/admin/pages/AdminRooms';
import AdminGallery from './features/admin/pages/AdminGallery';
import AdminReviews from './features/admin/pages/AdminReviews';
import AdminBlog from './features/admin/pages/AdminBlog';
import AdminMessages from './features/admin/pages/AdminMessages';
import ProtectedRoute from './features/admin/components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router basename="/posada-del-cerro">
      <div className="min-h-screen bg-[#F4ECD8] flex flex-col font-sans">
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><main className="flex-grow"><Home /></main><Footer /><WhatsAppButton /></>} />
          
          {/* Spanish Routes */}
          <Route path="/habitaciones/:id" element={<><Navbar /><main className="flex-grow"><RoomDetail /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/habitaciones" element={<><Navbar /><main className="flex-grow"><RoomsPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/servicios" element={<><Navbar /><main className="flex-grow"><ServicesPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/promociones" element={<><Navbar /><main className="flex-grow"><PromotionsPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/eventos" element={<><Navbar /><main className="flex-grow"><EventsPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/galeria" element={<><Navbar /><main className="flex-grow"><GalleryPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/contacto" element={<><Navbar /><main className="flex-grow"><ContactPage /></main><Footer /><WhatsAppButton /></>} />

          {/* English Routes Aliases */}
          <Route path="/rooms/:id" element={<><Navbar /><main className="flex-grow"><RoomDetail /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/rooms" element={<><Navbar /><main className="flex-grow"><RoomsPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/services" element={<><Navbar /><main className="flex-grow"><ServicesPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/promotions" element={<><Navbar /><main className="flex-grow"><PromotionsPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/events" element={<><Navbar /><main className="flex-grow"><EventsPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/gallery" element={<><Navbar /><main className="flex-grow"><GalleryPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/contact" element={<><Navbar /><main className="flex-grow"><ContactPage /></main><Footer /><WhatsAppButton /></>} />
          
          {/* Shared Routes */}
          <Route path="/reserve" element={<><Navbar /><main className="flex-grow"><BookingPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/blog" element={<><Navbar /><main className="flex-grow"><BlogPage /></main><Footer /><WhatsAppButton /></>} />
          <Route path="/blog/:id" element={<><Navbar /><main className="flex-grow"><BlogDetail /></main><Footer /><WhatsAppButton /></>} />

          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5492613433108"
    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
    rel="noopener noreferrer"
  >
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  </a>
);

export default App;
