import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [newAssignments, setNewAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  useEffect(() => {

    const fetchData = async () => {
      try {
        const [subRes, examRes, examsListRes, assignmentRes] =
          await Promise.all([
            api.get('/submissions/my-submissions'),
            api.get('/submissions/my-exam-results'),
            api.get('/exams'),
            api.get('/assignments')
          ]);

        setSubmissions(subRes.data);
        setExamResults(examRes.data);
        setAvailableExams(examsListRes.data);
        setAssignments(assignmentRes.data);

        const latestAssignments = assignmentRes.data
  .sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  )
  .slice(0, 5);

setNewAssignments(latestAssignments);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    // FIRST LOAD
    fetchData();

    // AUTO REFRESH EVERY 3 SEC
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    // INSTANT REFRESH EVENT
    const refreshDashboard = () => {
      fetchData();
    };

    window.addEventListener('submissionUpdated', refreshDashboard);

    // CLEANUP
    return () => {
      clearInterval(interval);
      window.removeEventListener('submissionUpdated', refreshDashboard);
    };

  }, []);


  

  // Check if an exam has been taken
  const isExamTaken = (examId) => {
    return examResults.some(result => result.exam?._id === examId);
  };

  // Get exam result for a specific exam
  const getExamResult = (examId) => {
    return examResults.find(result => result.exam?._id === examId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="animate-slideIn">
              <h1 className="text-3xl font-display font-bold">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="mt-2 text-white/80 text-lg">Continue your learning journey</p>
            </div>
            <div className="hidden lg:block">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float">
                <span className="text-3xl font-display font-bold">{user?.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg shadow-primary-100/50 p-6 animate-slideUp">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Assignments</p>
                <p className="text-3xl font-display font-bold text-primary-700">{submissions.length}</p>
                <p className="text-xs text-gray-400 mt-1">Submitted</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Exams Taken</p>
                <p className="text-3xl font-display font-bold text-green-600">{examResults.length}</p>
                <p className="text-xs text-gray-400 mt-1">Completed</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 p-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Available Exams</p>
                <p className="text-3xl font-display font-bold text-blue-600">{availableExams.length}</p>
                <p className="text-xs text-gray-400 mt-1">Ready to take</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-yellow-100/50 p-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending Review</p>
                <p className="text-3xl font-display font-bold text-yellow-600">
                  {submissions.filter(s => s.score === null).length}
                </p>
                <p className="text-xs text-gray-400 mt-1">Awaiting grades</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Exams Section - Main Focus */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Exams */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900">Available Exams</h2>
                  <p className="text-sm text-gray-500 mt-1">Exams created by your faculty</p>
                </div>
                <span className="badge bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {availableExams.filter(e => !isExamTaken(e._id)).length} New
                </span>
              </div>

              {availableExams.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Exams Available</h3>
                  <p className="text-gray-500">Your faculty hasn't created any exams yet. Check back later!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {availableExams.map((exam) => {
                    const taken = isExamTaken(exam._id);
                    const result = getExamResult(exam._id);

                    return (
                      <div key={exam._id} className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${taken ? 'bg-green-100' : 'bg-blue-100'
                                }`}>
                                {taken ? (
                                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                                  {exam.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Created by {exam.createdBy?.name || 'Faculty'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 ml-13">
                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {exam.duration} minutes
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {exam.questions?.length || 0} questions
                              </span>
                            </div>
                          </div>

                          <div className="ml-4">
                            {taken ? (
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">{result?.score || 0}%</div>
                                <span className="text-xs text-green-500 font-medium">Completed</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => navigate(`/student/exam/${exam._id}`)}
                                className="btn-primary bg-blue-600 hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Take Exam
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* My Exam Results */}
            {examResults.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-display font-bold text-gray-900 mb-4">My Exam Results</h2>
                <div className="space-y-3">
                  {examResults.slice(0, 5).map((result) => (
                    <div key={result._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{result.exam?.title || 'Exam'}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(result.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${(result.score || 0) >= 80 ? 'bg-green-100 text-green-700' :
                          (result.score || 0) >= 60 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {result.score || 0}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
{/* Notification Center */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 mb-6 animate-slideUp">
  
  {/* Header */}
  <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 py-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          🔔
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Notification Center
          </h2>
          <p className="text-orange-100 text-sm">
            Latest updates from faculty
          </p>
        </div>
      </div>

      <span className="px-3 py-1 bg-white text-red-600 rounded-full text-sm font-bold">
        {newAssignments.length}
      </span>
    </div>
  </div>

  {/* Body */}
  <div className="p-6">
    {newAssignments.length === 0 ? (
      <div className="text-center py-10">
        <div className="text-5xl mb-3">📭</div>
        <h3 className="font-semibold text-gray-900">
          No Notifications
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          You're all caught up.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {newAssignments.map((assignment, index) => (
          <div
            key={assignment._id}
            className="group flex items-start justify-between p-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold">
                  A
                </div>

                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  New Assignment Published
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {assignment.title}
                </p>

                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>
                    👨‍🏫 {assignment.createdBy?.name || 'Faculty'}
                  </span>

                  <span>
                    📅 {new Date(
                      assignment.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/student/assignments"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    )}

    {/* Footer */}
    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
      <span className="text-sm text-gray-500">
        Last updated just now
      </span>

      <button
        className="text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        Mark all as read
      </button>
    </div>
  </div>
</div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  to="/student/assignments"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Browse Assignments</span>
                </Link>
              </div>
            </div>
          
            {/* Recent Submissions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Recent Submissions</h2>
              {submissions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No submissions yet</p>
              ) : (
                <div className="space-y-2">
                  {submissions.slice(0, 3).map((sub) => (
                    <div key={sub._id} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {sub.assignment?.title || 'Assignment'}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                        {sub.score !== null ? (
                          <span className="text-xs font-bold text-green-600">{sub.score}%</span>
                        ) : (
                          <span className="text-xs text-yellow-600">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;