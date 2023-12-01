import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSignUp = async () => {
    try {
      if (password.length < 6) {
        setPasswordError('Password should be at least 6 characters long.');
        return;
      }

      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('User signed up:', userCredential.user);

      // Sign user in after login then redirect
      setSignUpSuccess(true);
      setTimeout(() => {
        setSignUpSuccess(false);
        navigate('/'); // Wait a few sec so the user can read the success message then redirect
      }, 2500);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='fullpage'>
      <h2>Sign Up</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
          />
          {passwordError && <Alert variant="danger">{passwordError}</Alert>}
        </Form.Group>

        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>

        {signUpSuccess && <Alert variant="success">Sign up successful!</Alert>}
      </Form>
    </div>
  );
};

export default SignUp;
