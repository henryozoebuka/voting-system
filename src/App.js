import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './pages/Login/Login.js';
import User from './pages/User/User.js';
import Voter from './pages/Voter/Voter.js';
import CreateUser from './pages/CreateUser/CreateUser.js';
import AddStudent from './pages/AddStudent/AddStudent.js';
import Student from './pages/Student/Student.js';
import Students from './pages/Students/Students.js';
import Vote from './pages/Vote/Vote.js';
import StudentVote from './pages/StudentVote/StudentVote.js';
import ElectionResult from './pages/ElectionResult/ElectionResult.js';
import VoteVerification from './pages/VoteVerification/VoteVerification.js';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Users from './pages/Users/Users.js';
import SuperAdminUser from './pages/SuperAdminUser/SuperAdminUser.js';
import EditStudent from './pages/EditStudent/EditStudent.js';
import EditVote from './pages/EditVote/EditVote.js';
import EditUser from './pages/EditUser/EditUser.js';

function App() {
  
  const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useSelector((state) => state.user);

    if (!user || (requiredRole && user.role !== requiredRole)) {
      // If user is not authenticated, redirect to /login
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  //voter protected

  const VoterProtectedRoute = ({ children }) => {
    const { voter } = useSelector((state) => state.voter);
  
    if (!voter) {
      // If voter data is not loaded or not authenticated, redirect to /login
      return <Navigate to="/login" replace />;
    }
  
    // If voter exists, render the protected content
    return children;
  };
  

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createuser' element={<CreateUser />} />
          <Route path='/user' element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path='/voter' element={<VoterProtectedRoute><Voter /></VoterProtectedRoute>} />
          <Route path='/edituser/:id' element={<ProtectedRoute requiredRole='super admin'><EditUser /></ProtectedRoute>} />
          <Route path='/users' element={<ProtectedRoute requiredRole='super admin'><Users /></ProtectedRoute>} />
          <Route path='/superadminuser/:id' element={<ProtectedRoute requiredRole='super admin'><SuperAdminUser /></ProtectedRoute>} />
          <Route path='/students' element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path='/student/:id' element={<ProtectedRoute><Student /></ProtectedRoute>} />
          <Route path='/editstudent/:id' element={<ProtectedRoute requiredRole='super admin'><EditStudent /></ProtectedRoute>} />
          <Route path='/addstudent' element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
          <Route path='/studentvote/:id' element={<VoterProtectedRoute><StudentVote /></VoterProtectedRoute>} />
          <Route path='/vote/:id' element={<ProtectedRoute><Vote /></ProtectedRoute>} />
          <Route path='/editvote/:id' element={<ProtectedRoute requiredRole='super admin'><EditVote /></ProtectedRoute>} />
          <Route path='/electionresult' element={<ProtectedRoute requiredRole='super admin'><ElectionResult /></ProtectedRoute>} />
          <Route path='/voteverification' element={<ProtectedRoute requiredRole='super admin'><VoteVerification /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
