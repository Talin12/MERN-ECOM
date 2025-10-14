import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { fetchProducts } from '../redux/productsSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  
  // Select data from the Redux store
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Only fetch products if the status is 'idle'
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'failed' ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;