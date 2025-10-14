import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { fetchProductById } from '../redux/productsSlice.js';

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const { product, statusDetails, errorDetails } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      
      {statusDetails === 'loading' ? (
        <Loader />
      ) : statusDetails === 'failed' ? (
        <Message variant="danger">{errorDetails}</Message>
      ) : product ? (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid rounded />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
              <ListGroup.Item>{product.rating} from {product.numReviews} reviews</ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="w-100" type="button" disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : null } {/* Corrected line with closing parenthesis */}
    </>
  );
};

export default ProductPage;