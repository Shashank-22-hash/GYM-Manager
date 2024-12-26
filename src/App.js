import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminDashboard from './components/AdminDashboard';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import UserDashboard from './components/UserDashboard';
import MemberLogin from './components/MemberLogin';
import MemberRegister from './components/MemberRegister';
import MemberDashboard from './components/MemberDashboard'
import AddMember from './components/AddMember';
import UpdateDeleteMembers from './components/UpdateDeleteMembers';
import CreateBill from './components/CreateBill';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/member-register" element={<MemberRegister />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/add-member" element={<AddMember />}/>
        <Route path="/update-delete-members" element={<UpdateDeleteMembers />}/>
        <Route path="/create-bill" element={<CreateBill />}/>
      </Routes>
    </Router>
  );
}

export default App;
