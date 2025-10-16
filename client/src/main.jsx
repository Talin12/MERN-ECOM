import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store from './redux/store';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          { path: 'profile', element: <ProfilePage /> },
          { path: 'shipping', element: <ShippingPage /> },
          { path: 'payment', element: <PaymentPage /> },
          { path: 'placeorder', element: <PlaceOrderPage /> },
          { path: 'order/:id', element: <OrderPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);