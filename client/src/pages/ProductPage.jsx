import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { fetchProductById } from '../redux/productsSlice.js';
import { addToCart } from '../redux/cartSlice.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { product, statusDetails, errorDetails } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (statusDetails === 'loading') return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  if (statusDetails === 'failed') return <div className="container mx-auto py-28"><Message variant="danger">{errorDetails}</Message></div>;

  return (
    product && (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-8 no-underline">
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </Link>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex flex-col h-full">
              <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
              <div className="text-lg text-slate-400 mb-4">{product.rating} ★ from {product.numReviews} reviews</div>
              <p className="text-3xl font-semibold text-white mb-4">${product.price}</p>
              <p className="text-slate-300 leading-relaxed mb-6">{product.description}</p>
              
              <Card className="mt-auto bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-300">Status:</span>
                    <span className={product.countInStock > 0 ? 'text-green-400' : 'text-red-400'}>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  {product.countInStock > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-300">Quantity:</span>
                      <Input
                        type="number"
                        min="1"
                        max={product.countInStock}
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-20 bg-slate-900 border-slate-700"
                      />
                    </div>
                  )}
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    )
  );
};

export default ProductPage;