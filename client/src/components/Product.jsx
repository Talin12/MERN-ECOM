import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Product = ({ product }) => {
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Card className="group w-full h-full flex flex-col bg-slate-800/50 border-slate-700/50 text-white overflow-hidden shadow-lg transition-all duration-300 hover:border-slate-600 hover:shadow-blue-500/10">
        <div className="relative overflow-hidden">
          <Link to={`/product/${product._id}`} className="block aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300"
          >
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-10 w-10">
              <Plus size={20} />
            </Button>
          </motion.div>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <Link to={`/product/${product._id}`} className="text-decoration-none">
              <h3 className="font-semibold text-slate-200 leading-snug truncate group-hover:text-blue-400 transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="text-xs text-slate-400 mt-2">
              <span>{product.rating} ★</span>
              <span className="text-slate-600 mx-1.5">|</span>
              <span>{product.numReviews} Reviews</span>
            </div>
          </div>
          <p className="text-xl font-bold text-white mt-4">${product.price}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Product;