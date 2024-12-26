import { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddMember() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddMember = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create the user (member) in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save the user's role as 'member' in Firestore
      await setDoc(doc(db, 'users', userId), { email, role: 'member' });

      navigate('/admin-dashboard');
    } catch (error) {
      setError('Failed to add member. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add New Member</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleAddMember}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Member
        </Button>
      </Form>
    </Container>
  );
}

export default AddMember;
