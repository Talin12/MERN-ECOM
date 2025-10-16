import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Payment Method</CardTitle>
          <CardDescription className="text-slate-400">How would you like to pay?</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckoutSteps step1 step2 step3 />
          <form onSubmit={submitHandler}>
            <div className="space-y-2">
              <Label as="legend" className="text-base font-medium">Select Method</Label>
              <div className="flex items-center space-x-2 rounded-md border border-slate-700 bg-slate-900 p-4">
                <input type="radio" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-blue-600 border-slate-600 bg-slate-800 focus:ring-blue-500"/>
                <Label htmlFor="PayPal" className="flex flex-col space-y-1">
                  <span>PayPal or Credit Card</span>
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;