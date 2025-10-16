import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { fetchProducts } from '../redux/productsSlice.js';
import { Button } from '@/components/ui/button';

// Hero Section Component
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center text-center">
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://placehold.co/1920x1080/000000/white?text=Modern+Shop')`,
          y: y,
        }}
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <motion.div
        className="z-20 text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          Style Meets Substance
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 mb-8">
          Discover our curated collection of premium products, designed for the modern world.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
          Shop Now
        </Button>
      </motion.div>
    </div>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <HeroSection />
      <Container className="py-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Featured Products
        </h2>
        {status === 'loading' ? (
          <Loader />
        ) : status === 'failed' ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <Product product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default HomePage;