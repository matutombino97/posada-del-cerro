import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
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

import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();
  return (
    <Router>
      <div className="min-h-screen bg-[#F4ECD8] flex flex-col font-sans">
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Shared Layout and Transitions */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            
            {/* Spanish Routes */}
            <Route path="/habitaciones/:id" element={<RoomDetail />} />
            <Route path="/habitaciones" element={<RoomsPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/promociones" element={<PromotionsPage />} />
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            {/* English Routes Aliases */}
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Shared Routes */}
            <Route path="/reserve" element={<BookingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Route>
          
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

export default App;
