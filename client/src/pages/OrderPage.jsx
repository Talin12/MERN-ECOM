import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, resetPay } from '../redux/orderSlice';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error, successPay, loadingPay } = useSelector((state) => state.order);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (successPay) {
      dispatch(resetPay());
    }
    if (!order || order._id !== orderId || successPay) {
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/orders/config/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': clientId.clientId, currency: 'USD' },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (!window.paypal) {
        loadPaypalScript();
      }
    }
  }, [order, orderId, dispatch, paypalDispatch, successPay]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      dispatch(payOrder({ orderId, paymentResult: details }));
    });
  }

  function createOrder(data, actions) {
    return actions.order.create({ purchase_units: [{ amount: { value: order.totalPrice } }] }).then((orderID) => orderID);
  }

  function onError(err) {
    console.error('PayPal Error:', err);
  }

  return loading ? <div className="min-h-[80vh] flex items-center justify-center"><Loader /></div> : error ? <Message variant="danger">{error}</Message> : order ? (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <h1 className="text-3xl font-bold text-white mb-4">Order {order._id}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader><CardTitle>Shipping</CardTitle></CardHeader>
            <CardContent>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p className="text-slate-300">
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
            <CardContent>
              <p className="text-slate-300"><strong>Method: </strong>{order.paymentMethod}</p>
              {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader><CardTitle>Order Items</CardTitle></CardHeader>
            <CardContent>
              {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <Link to={`/product/${item.product}`} className="ml-4 flex-grow font-medium text-slate-200 hover:underline">{item.name}</Link>
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
              <div className="flex justify-between"><span>Items</span><span>${order.itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${order.shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${order.taxPrice}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-700"><span>Total</span><span>${order.totalPrice}</span></div>
              {!order.isPaid && (
                <div className="mt-4">
                  {loadingPay && <Loader />}
                  {isPending ? <Loader /> : (
                    <div>
                      <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderPage;