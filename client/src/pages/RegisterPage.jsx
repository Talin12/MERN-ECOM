import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { register } from '../redux/authSlice.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

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
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-slate-400">Create an account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input type="password" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-slate-900 border-slate-700" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader /> : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="text-slate-400">
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-medium text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;