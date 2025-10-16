import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getMyOrders } from '../redux/orderSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle } from 'lucide-react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Name</p>
                <p className="font-medium">{userInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-white mb-6">My Orders</h2>
          {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Card className="bg-slate-800/50 border-slate-700 text-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-800">
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">DATE</TableHead>
                    <TableHead className="text-white">TOTAL</TableHead>
                    <TableHead className="text-white">PAID</TableHead>
                    <TableHead className="text-white">DELIVERED</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myOrders.map((order) => (
                    <TableRow key={order._id} className="border-slate-700 hover:bg-slate-800">
                      <TableCell className="font-medium truncate max-w-[100px]">{order._id}</TableCell>
                      <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>
                        {order.isPaid ? <CheckCircle2 className="text-green-400" /> : <XCircle className="text-red-400" />}
                      </TableCell>
                      <TableCell>
                        {order.isDelivered ? <CheckCircle2 className="text-green-400" /> : <XCircle className="text-red-400" />}
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/order/${order._id}`}>Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;