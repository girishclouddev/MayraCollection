import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Clothes from './pages/Clothes';
import Jewelry from './pages/Jewelry';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './admin/AdminDashboard';
import { Instagram, Phone } from 'lucide-react';

// Simple auth check for ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans relative">
        <Navbar />
        <main className="flex-grow pt-16"> {/* Add padding top for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <footer className="bg-primary-900 text-white py-12 mt-16 text-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-6">
              <img src="/logo.svg" alt="MayraCollection Logo" className="h-16 w-16 mb-4 drop-shadow-md brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
              <h2 className="text-3xl font-serif text-white tracking-widest">MayraCollection</h2>
            </div>
            <p className="text-primary-200">Premium Fashion & Jewelry</p>
            <div className="mt-10 pt-6 border-t border-primary-800/50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-400/70">
                <p>&copy; {new Date().getFullYear()} MayraCollection. All rights reserved.</p>

                <div className="flex items-center gap-2.5 text-[10px] opacity-75 hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1">
                    Designed & Built by <span className="text-primary-300 font-medium tracking-wider">Girish Jadav</span>
                  </span>

                  <span className="w-px h-2 bg-primary-700/50 mx-0.5"></span>

                  <a href="tel:+918320358612" className="flex items-center gap-1 hover:text-white transition-colors group">
                    <Phone className="w-2.5 h-2.5 group-hover:scale-110 transition-transform" />
                    <span>8320358612</span>
                  </a>

                  <span className="w-px h-2 bg-primary-700/50 mx-0.5"></span>

                  <a href="https://www.instagram.com/girish_jadav_007" target="_blank" rel="noreferrer" className="hover:text-white transition-colors group flex items-center" aria-label="Instagram">
                    <Instagram className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Toaster position="bottom-center" toastOptions={{
          style: { background: '#382b25', color: '#fff' }
        }} />
      </div>
    </BrowserRouter>
  );
}

export default App;
