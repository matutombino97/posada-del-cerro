import { useState } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { auth } from '../../../services/firebase';
import { signOut } from 'firebase/auth';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Bed, 
  Image as ImageIcon, 
  MessageSquare, 
  FileText, 
  Inbox,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Reservas', icon: CalendarCheck, path: '/admin/bookings' },
    { name: 'Habitaciones', icon: Bed, path: '/admin/rooms' },
    { name: 'Galería', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Reseñas', icon: MessageSquare, path: '/admin/reviews' },
    { name: 'Blog', icon: FileText, path: '/admin/blog' },
    { name: 'Mensajes', icon: Inbox, path: '/admin/messages' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-primary-brown text-white transition-all duration-300 fixed md:relative z-40 h-full ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          <span className={`font-serif font-bold text-xl overflow-hidden whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>
            La Posada <span className="text-primary-beige/50">Admin</span>
          </span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow mt-6 px-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center p-3 rounded-xl transition-all
                ${isActive ? 'bg-white text-primary-brown shadow-lg font-bold' : 'text-primary-beige/60 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon size={22} className="flex-shrink-0" />
              <span className={`ml-4 overflow-hidden whitespace-nowrap transition-all ${!isSidebarOpen && 'hidden'}`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-primary-beige/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <LogOut size={22} className="flex-shrink-0" />
            <span className={`ml-4 overflow-hidden whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>
              Cerrar Sesión
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 flex justify-between items-center md:hidden">
            <span className="font-serif font-bold text-primary-brown">La Posada</span>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-primary-brown">
                <Menu />
            </button>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
