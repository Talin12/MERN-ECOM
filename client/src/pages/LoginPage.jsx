import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { login } from '../redux/authSlice.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, status, error } = useSelector((state) => state.auth);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-slate-400">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <Message variant="danger">{error}</Message>}
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-700"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-slate-700"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader /> : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="text-slate-400">
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-blue-400 hover:text-blue-300">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;