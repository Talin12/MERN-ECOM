import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <Container>
        <Navbar expand="lg" variant="dark" className="transition-all duration-300 bg-transparent">
          <LinkContainer to="/">
            <Navbar.Brand className="text-2xl font-bold tracking-wider text-white">MERN E-Commerce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto items-center space-x-4">
              <LinkContainer to="/cart">
                <Nav.Link className="flex items-center space-x-2 text-slate-200 hover:text-white">
                  <div className="flex items-center">
                    <ShoppingCart size={20} />
                    <span className="ms-2">Cart</span>
                  </div>
                  <AnimatePresence>
                    {cartItems.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="ms-1"
                      >
                        <Badge pill bg="primary">
                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="flex items-center space-x-2 text-slate-200 hover:text-white">
                    <User size={20} />
                    <span>Sign In</span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </motion.header>
  );
};

export default Header;