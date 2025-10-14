import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { fetchProductById } from '../redux/productsSlice.js';
import { addToCart } from '../redux/cartSlice.js';

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add state for the quantity selector
  const [qty, setQty] = useState(1);

  const { product, statusDetails, errorDetails } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  // --- NEW --- Handler for adding items to the cart
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

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

                {/* --- NEW --- Quantity Selector */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="w-100"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler} // --- NEW --- Add onClick handler
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : null }
    </>
  );
};

export default ProductPage;