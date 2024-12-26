import { Container, Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';



function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      <Button variant="primary" className="m-2" onClick={() => navigate('/add-member')}>Add Member</Button>
      <Button variant="warning" className="m-2" onClick={() => navigate('/update-delete-members')}>Update/Delete Members</Button>
      <Button variant="success" className="m-2" onClick={() => navigate('/create-bill')}>Create Bills</Button>
      <Button variant="danger" className="mt-3" onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

export default AdminDashboard;
