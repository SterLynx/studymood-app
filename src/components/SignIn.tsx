import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from '../firebase';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('User signed in:', userCredential.user);
      // Additional actions after successful sign-in, unlock features upon successful sign in 
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error display or other actions
    }
  };

  return (
    <div className='fullpage'>
      <h2>Sign In</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleSignIn}>
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
