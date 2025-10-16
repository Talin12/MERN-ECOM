import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const Product = ({ product }) => {
  return (
    <motion.div whileHover={{ y: -8, transition: { duration: 0.2 } }}>
      <Card className="w-full h-full flex flex-col overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors duration-300">
        <CardHeader className="p-0">
          <Link to={`/product/${product._id}`}>
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Link to={`/product/${product._id}`} className="text-decoration-none">
            <h3 className="text-base font-semibold text-slate-800 leading-snug truncate hover:underline">
              {product.name}
            </h3>
          </Link>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-lg font-bold text-slate-900">${product.price}</p>
          <div className="text-xs text-slate-500">
            <span>{product.rating} ★</span>
            <span className="text-slate-300 mx-1">|</span>
            <span>{product.numReviews}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Product;