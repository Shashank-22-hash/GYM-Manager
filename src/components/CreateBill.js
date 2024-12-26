import { useState } from 'react';
import { db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreateBill() {
  const [memberEmail, setMemberEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateBill = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Save bill data to Firestore
      const billData = {
        memberEmail,
        amount,
        date: new Date(),
      };
      await setDoc(doc(db, 'bills', `${memberEmail}-${Date.now()}`), billData);

      navigate('/admin-dashboard');
    } catch (error) {
      setError('Failed to create bill. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Bill</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleCreateBill}>
        <Form.Group controlId="memberEmail">
          <Form.Label>Member Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter member's email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="amount" className="mt-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Bill
        </Button>
      </Form>
    </Container>
  );
}

export default CreateBill;
