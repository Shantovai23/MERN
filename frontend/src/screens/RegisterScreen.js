import React, { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import PasswordStrengthBar from 'react-password-strength-bar';

const RegisterScreen = ({location,history}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const redirect=location.search? location.search.split('=')[1] : '/'
  console.log(redirect)

  const dispatch=useDispatch()
  const userRegister=useSelector(state=>state.userRegister)
  const {loading,error,userInfo}=userRegister

  useEffect(()=>{
      if(userInfo){
          history.push(redirect)
      }
  },[history,userInfo,redirect])

  const submitHandler=(e)=>{
      e.preventDefault()
      if(password!==confirmPassword){
          setMessage("Password Doesn't Match")
      }else{
        dispatch(register(name,email,password))
      }
  

  }
  return (
    <FormContainer>
      <h2 className='sign-in'>Sign Up</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='input-border'
          ></Form.Control>
        </Form.Group>


        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input-border'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input-border'
          ></Form.Control>
        </Form.Group>

        <PasswordStrengthBar password={password} minLength={4} barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']} />

        <Form.Group controlId="ConfirmPassword">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='input-border'
          ></Form.Control>
        </Form.Group>

        <Button className='but bounce-in-top' type="submit" variant="primary" style={{backgroundColor:'#3CA861',borderRadius:'5px'}}>
         Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
