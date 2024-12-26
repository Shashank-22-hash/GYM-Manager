import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UpdateDeleteMembers() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const membersList = querySnapshot.docs
        .filter(doc => doc.data().role === 'member')
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setMembers(membersList);
    };
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <Container className="mt-5">
      <h2>Update/Delete Members</h2>
      <ListGroup>
        {members.map(member => (
          <ListGroup.Item key={member.id}>
            {member.email}
            <Button variant="warning" className="ml-2" onClick={() => navigate(`/update-member/${member.id}`)}>Update</Button>
            <Button variant="danger" className="ml-2" onClick={() => handleDelete(member.id)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default UpdateDeleteMembers;
