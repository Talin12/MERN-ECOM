import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold tracking-wider text-white no-underline">
            MERN E-Commerce
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center space-x-2 text-slate-200 hover:text-white no-underline">
                <ShoppingCart size={20} />
                <span>Cart</span>
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="ml-1 inline-block bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                  >
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            {userInfo ? (
              <div className="relative group">
                 <Button variant="ghost" className="text-slate-200 hover:text-white hover:bg-slate-700">{userInfo.name}</Button>
                 <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                   <Link to="/profile" className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 no-underline">Profile</Link>
                   <a onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer">Logout</a>
                 </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 text-slate-200 hover:text-white no-underline">
                <User size={20} />
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;