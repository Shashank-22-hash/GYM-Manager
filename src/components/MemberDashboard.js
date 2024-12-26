import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

function MemberDashboard() {
  const [user] = useAuthState(auth);  // Get the current logged-in user
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');

  // Fetch bills based on logged-in member's email
  const fetchBills = async () => {
    if (!user) return;  // Ensure user is logged in

    try {
      const q = query(
        collection(db, 'bills'),
        where('memberEmail', '==', user.email),
      );
      const querySnapshot = await getDocs(q);
      const billsList = querySnapshot.docs.map(doc => doc.data());
      setBills(billsList);
    } catch (err) {
      setError('Failed to fetch bills.');
      console.error(err);
    }
  };

  // Run when the component mounts or user changes
  useEffect(() => {
    fetchBills();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Container className="mt-5">
      <h2>Member Dashboard</h2>
      {error && <div>{error}</div>}

      <h4>Your Bill Receipts</h4>
      <ListGroup>
        {bills.length ? (
          bills.map((bill, index) => (
            <ListGroup.Item key={index}>
              {bill.memberEmail} - {bill.amount} (Date: {new Date(bill.date.seconds * 1000).toLocaleDateString()})
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No bills found</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
}

export default MemberDashboard;
