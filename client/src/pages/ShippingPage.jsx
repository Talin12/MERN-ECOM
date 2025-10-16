import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Shipping</CardTitle>
          <CardDescription className="text-slate-400">Where should we send your order?</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckoutSteps step1 step2 />
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" placeholder="Enter address" value={address} required onChange={(e) => setAddress(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input type="text" id="city" placeholder="Enter city" value={city} required onChange={(e) => setCity(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input type="text" id="postalCode" placeholder="Enter postal code" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input type="text" id="country" placeholder="Enter country" value={country} required onChange={(e) => setCountry(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingPage;