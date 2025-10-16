import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import { updateCartQuantity, removeFromCart } from '../redux/cartSlice.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const updateQuantityHandler = (item, qty) => {
    dispatch(updateCartQuantity({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to="/" className="text-blue-400 hover:underline">Go Back</Link>
            </Message>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item._id} className="flex items-center p-4 bg-slate-800/50 border-slate-700 text-white">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <Link to={`/product/${item._id}`} className="font-semibold text-slate-200 hover:underline no-underline">{item.name}</Link>
                    <div className="text-lg font-bold text-white mt-1">${item.price}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      min="1"
                      max={item.countInStock}
                      value={item.qty}
                      onChange={(e) => updateQuantityHandler(item, Number(e.target.value))}
                      className="w-20 bg-slate-900 border-slate-700"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCartHandler(item._id)}>
                      <Trash2 className="h-5 w-5 text-slate-400 hover:text-red-500" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Subtotal ({totalItems}) items</h2>
              <div className="text-3xl font-extrabold mb-6">${subtotal}</div>
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;