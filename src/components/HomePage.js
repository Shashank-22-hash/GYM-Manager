import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function HomePage() {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Gym Buddy</h1>
      <Link to="/admin-login">
        <Button variant="primary" className="m-2">Admin Login</Button>
      </Link>
      <Link to="/user-login">
        <Button variant="secondary" className="m-2">User Login</Button>
      </Link>
      <Link to="/member-login">
        <Button variant="success" className="m-2">Member Login</Button>
      </Link>
    </Container>
  );
}

export default HomePage;
