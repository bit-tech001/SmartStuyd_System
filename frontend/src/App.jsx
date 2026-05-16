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
         {/* <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/> */}
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/assignments" element={<ProtectedRoute role="admin"><ManageAssignments /></ProtectedRoute>} />
          <Route path="/admin/exams" element={<ProtectedRoute role="admin"><ManageExams /></ProtectedRoute>} />
          <Route path="/admin/submissions" element={<ProtectedRoute role="admin"><AdminSubmissions /></ProtectedRoute>} />
          <Route path="/admin/submissions/:assignmentId" element={<ProtectedRoute role="admin"><ViewSubmissions /></ProtectedRoute>} />
          <Route path="/admin/rate/:submissionId" element={<ProtectedRoute role="admin"><RateSubmission /></ProtectedRoute>} />
          <Route path="/admin/exam-results/:examId" element={<ProtectedRoute role="admin"><ExamResultsList /></ProtectedRoute>} />
          
          {/* Default Route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;