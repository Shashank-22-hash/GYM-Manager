import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Button, Form, ListGroup } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

function UserDashboard() {
  const [user] = useAuthState(auth);  // Get the current logged-in user
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  // Fetch user details and records (e.g., bills) based on search query
  const fetchRecords = async () => {
    if (!user) return;  // Ensure user is logged in

    try {
      const q = query(
        collection(db, 'bills'),
        where('memberEmail', '==', user.email),
      );
      const querySnapshot = await getDocs(q);
      const recordsList = querySnapshot.docs.map(doc => doc.data());
      setRecords(recordsList);
    } catch (err) {
      setError('Failed to fetch records.');
      console.error(err);
    }
  };

  // Run when the component mounts or when searchQuery changes
  useEffect(() => {
    fetchRecords();
  }, [user, searchQuery]);

  return (
    <Container className="mt-5">
      <h2>User Dashboard</h2>
      {error && <div>{error}</div>}

      <h4>Your Details</h4>
      <p>Email: {user ? user.email : 'No user logged in'}</p>

      <h4>Search Records</h4>
      <Form.Control
        type="text"
        placeholder="Search records"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
      />
      
      <h4>Record Results</h4>
      <ListGroup>
        {records.length ? (
          records.map((record, index) => (
            <ListGroup.Item key={index}>
              {record.memberEmail} - {record.amount} (Date: {new Date(record.date.seconds * 1000).toLocaleDateString()})
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No records found</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
}

export default UserDashboard;
