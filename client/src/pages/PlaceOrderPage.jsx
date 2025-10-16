import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createOrder } from '../redux/orderSlice';
import { clearCartItems } from '../redux/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { order, success, error, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(clearCartItems());
    }
  }, [navigate, success, order, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader><CardTitle>Shipping</CardTitle></CardHeader>
            <CardContent>
              <p className="text-slate-300">
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
            <CardContent>
              <p className="text-slate-300"><strong>Method: </strong>{cart.paymentMethod}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader><CardTitle>Order Items</CardTitle></CardHeader>
            <CardContent>
              {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <div className="space-y-4">
                  {cart.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <Link to={`/product/${item._id}`} className="ml-4 flex-grow font-medium text-slate-200 hover:underline">{item.name}</Link>
                      <div className="text-slate-300">{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between"><span>Items</span><span>${cart.itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${cart.shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${cart.taxPrice}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-700"><span>Total</span><span>${cart.totalPrice}</span></div>
              {error && <Message variant="danger">{error}</Message>}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
                {loading ? <Loader /> : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;