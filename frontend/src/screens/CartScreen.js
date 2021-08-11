import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import swal from 'sweetalert';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { addToCart,removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler=(id)=>{
   dispatch(removeFromCart(id))
   swal({
    title: "Deleted",
    text: "You deleted the Product",
    icon: "error",
    button: "Close",
  });

   //that was a bug that remains the last product to the cart after reload the browser that page,thats why params always give that specific id  of last added product ,and it reload with the id ,and it remians in the storage//
   
   history.push('/cart')
  }

  const checkoutHandler=()=>{
      history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h2 className='cart'>Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is Empty{" "}
            <Link to="/" className="btn btn-info btn-sm">
              Back to Shopping
            </Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Tk {item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      className='input-border'
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='danger' style={{borderRadius:'5px'}} onClick={()=>removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
          <Card>
              <ListGroup variant='flush'>
                 <ListGroup.Item>
                   <h4 className='add-box' style={{color:'#3CA861'}}>SubTotal  ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h4>
                   TK {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                 </ListGroup.Item>
                 <ListGroup.Item>
                    <Button variant='success' style={{borderRadius:'5px'}} type='button' className='btn btn-block but' disabled={cartItems.length===0} onClick={checkoutHandler}>
                      Checkout
                    </Button>
                   </ListGroup.Item>
              </ListGroup>
          </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
