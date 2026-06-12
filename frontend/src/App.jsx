import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import ViewAssignments from './pages/student/ViewAssignments';
import SubmitAssignment from './pages/student/SubmitAssignment';
import TakeExam from './pages/student/TakeExam';
import ExamResult from './pages/student/ExamResult';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAssignments from './pages/admin/ManageAssignments';
import ManageExams from './pages/admin/ManageExams';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import ViewSubmissions from './pages/admin/ViewSubmissions';
import RateSubmission from './pages/admin/RateSubmission';
import ExamResultsList from './pages/admin/ExamResultsList';
import ProtectedRoute from './components/common/ProtectedRoute';
import Calendar from './components/common/Calendar';
import Navbar from './components/common/Navbar';
// import Profile from './pages/Profile';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/assignments" element={<ProtectedRoute role="student"><ViewAssignments /></ProtectedRoute>} />
          <Route path="/student/assignment/:id" element={<ProtectedRoute role="student"><SubmitAssignment /></ProtectedRoute>} />
          <Route path="/student/exam/:id" element={<ProtectedRoute role="student"><TakeExam /></ProtectedRoute>} />
          <Route path="/student/exam-result/:id" element={<ProtectedRoute role="student"><ExamResult /></ProtectedRoute>} />
          <Route path='/calendar' element={<ProtectedRoute role="student"><Calendar /></ProtectedRoute>} />
         {/* <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/> */}
          {/* Admin Routes */}
          <Route path="/faculty/dashboard" element={<ProtectedRoute role="faculty"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/faculty/assignments" element={<ProtectedRoute role="faculty"><ManageAssignments /></ProtectedRoute>} />
          <Route path="/faculty/exams" element={<ProtectedRoute role="faculty"><ManageExams /></ProtectedRoute>} />
          <Route path="/faculty/submissions" element={<ProtectedRoute role="faculty"><AdminSubmissions /></ProtectedRoute>} />
          <Route path="/faculty/submissions/:assignmentId" element={<ProtectedRoute role="faculty"><ViewSubmissions /></ProtectedRoute>} />
          <Route path="/faculty/rate/:submissionId" element={<ProtectedRoute role="faculty"><RateSubmission /></ProtectedRoute>} />
          <Route path="/faculty/exam-results/:examId" element={<ProtectedRoute role="faculty"><ExamResultsList /></ProtectedRoute>} />
          <Route path='/faculty/calendar' element={<ProtectedRoute role="faculty"><Calendar /></ProtectedRoute>} />
          
          {/* Default Route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;