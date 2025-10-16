import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { fetchProducts } from '../redux/productsSlice.js';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Animated Text Component
const AnimatedText = ({ text, el: Wrapper = 'p', className }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
    }),
  };

  const charVariants = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <Wrapper className={className}>
      <motion.span variants={textVariants} initial="hidden" animate="visible" className="inline-block">
        {text.split('').map((char, index) => (
          <motion.span key={index} variants={charVariants} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

// Hero Section Component
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center -mt-[88px] pt-[88px]">
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop')`, y }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="z-20 text-white px-4">
        <AnimatedText text="Where Quality Meets Design" el="h1" className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4" />
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: 'easeInOut' }}
        >
          Explore a world of premium products, crafted with passion and an eye for detail.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: 'easeInOut' }}
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg group">
            Explore Collection <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform"/>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

// Main HomePage Component
const HomePage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => { if (status === 'idle') { dispatch(fetchProducts()); } }, [status, dispatch]);
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="bg-slate-900 text-white">
      <HeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-center mb-4">
            Our Products
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Each item in our collection is chosen for its exceptional quality and timeless design.
          </p>
        </motion.div>
        
        {status === 'loading' ? ( <Loader /> ) : status === 'failed' ? ( <Message variant="danger">{error}</Message> ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {products.map((product) => ( <Product key={product._id} product={product} /> ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;