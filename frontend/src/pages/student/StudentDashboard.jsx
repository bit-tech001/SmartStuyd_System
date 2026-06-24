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
  const [newAssignments, setNewAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, examRes, examsListRes, assignmentRes] = await Promise.all([
          api.get('/submissions/my-submissions'),
          api.get('/submissions/my-exam-results'),
          api.get('/exams'),
          api.get('/assignments')
        ]);

        const incomingSubmissions = subRes.data || [];
        const incomingExamResults = examRes.data || [];

        setSubmissions(incomingSubmissions);
        setExamResults(incomingExamResults);
        setAvailableExams(examsListRes.data || []);

        // Create sets of attended assignment & exam IDs for fast lookup
        const attendedAssignmentIds = new Set(incomingSubmissions.map(s => s.assignment?.p_id || s.assignment?._id));
        const attendedExamIds = new Set(incomingExamResults.map(r => r.exam?._id));

        // Filter out items that the student has already submitted or attended
        const sortedAssignments = (assignmentRes.data || [])
          .filter(assignment => 
            !attendedAssignmentIds.has(assignment._id) && 
            !attendedExamIds.has(assignment._id) &&
            !attendedExamIds.has(assignment.exam?._id)
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
          
        setNewAssignments(sortedAssignments);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);
    const refreshDashboard = () => fetchData();

    window.addEventListener('submissionUpdated', refreshDashboard);

    return () => {
      clearInterval(interval);
      window.removeEventListener('submissionUpdated', refreshDashboard);
    };
  }, []);

  const isExamTaken = (examId) => examResults.some(result => result.exam?._id === examId);
  const getExamResult = (examId) => examResults.find(result => result.exam?._id === examId);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="relative w-12 h-12">
          <div className="absolute w-12 h-12 rounded-full border-4 border-primary-100"></div>
          <div className="absolute w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const pendingGradesCount = submissions.filter(s => s.score === null).length;
  const uncompletedExamsCount = availableExams.filter(e => !isExamTaken(e._id)).length;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12 antialiased">
      {/* Welcome Banner */}
      <div className="bg-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-600 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="mt-1 text-primary-100 text-sm sm:text-base opacity-90">
                Continue your learning journey and view your current updates.
              </p>
            </div>
            {user?.name && (
              <div className="hidden sm:flex w-14 h-14 bg-white/10 backdrop-blur border border-white/10 rounded-xl items-center justify-center font-semibold text-xl shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Assignments', value: submissions.length, sub: 'Submitted', color: 'text-primary-700', bg: 'bg-primary-50', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2' },
            { label: 'Exams Taken', value: examResults.length, sub: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Available Exams', value: availableExams.length, sub: 'Ready to take', color: 'text-blue-600', bg: 'bg-blue-50', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2' },
            { label: 'Pending Review', value: pendingGradesCount, sub: 'Awaiting grades', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-2xl sm:text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bg} hidden sm:block`}>
                  <svg className={`w-5 h-5 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Content Workspace layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Dashboard Panel Section (Left/Center 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Available Exams Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Available Exams</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Exams published by your course instructors</p>
                </div>
                {uncompletedExamsCount > 0 && (
                  <span className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {uncompletedExamsCount} New
                  </span>
                )}
              </div>

              {availableExams.length === 0 ? (
                <div className="text-center py-10">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
                  </svg>
                  <p className="text-sm font-medium text-gray-500">No exams available right now.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {availableExams.map((exam) => {
                    const taken = isExamTaken(exam._id);
                    const result = getExamResult(exam._id);

                    return (
                      <div key={exam._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg mt-0.5 ${taken ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50 text-primary-600'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {taken ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                              )}
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{exam.title}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">By {exam.createdBy?.name || 'Faculty'}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">⏱️ {exam.duration} mins</span>
                              <span className="flex items-center gap-1">📋 {exam.questions?.length || 0} Questions</span>
                            </div>
                          </div>
                        </div>

                        <div className="sm:text-right flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-0 pt-3 sm:pt-0 border-gray-100">
                          {taken ? (
                            <div>
                              <div className="text-lg font-bold text-emerald-600">{result?.score || 0}%</div>
                              <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">Completed</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => navigate(`/student/exam/${exam._id}`)}
                              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
                            >
                              Take Exam
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* My Exam Results Card */}
            {examResults.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Exam Academic Records</h2>
                <div className="divide-y divide-gray-100">
                  {examResults.slice(0, 5).map((result) => (
                    <div key={result._id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{result.exam?.title || 'Exam'}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(result.submittedAt).toLocaleDateString()}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded text-xs font-bold ${
                        (result.score || 0) >= 80 ? 'bg-emerald-50 text-emerald-700' :
                        (result.score || 0) >= 60 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {result.score || 0}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Columns (1 Column) */}
          <div className="space-y-6">
            
            {/* Notification Center */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-primary-50 p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-800">
                  <span className="text-base">🔔</span>
                  <h2 className="font-bold text-sm sm:text-base">Notifications</h2>
                </div>
                {newAssignments.length > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {newAssignments.length}
                  </span>
                )}
              </div>

              <div className="p-4">
                {newAssignments.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 text-xs">
                    No new assignments published.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {newAssignments.map((assignment) => (
                      <div key={assignment._id} className="p-3 bg-gray-50 border border-gray-100 rounded-lg flex flex-col justify-between gap-2">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded">Assignment</span>
                            <span className="text-[11px] text-gray-400">{new Date(assignment.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h4 className="font-semibold text-gray-800 text-xs mt-1.5 line-clamp-1">{assignment.title}</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">Instructor: {assignment.createdBy?.name || 'Faculty'}</p>
                        </div>
                        <Link
                          to="/student/assignments"
                          className="w-full text-center bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs py-1.5 rounded font-medium transition-colors"
                        >
                          View Task
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Sync Active</span>
                  <button className="text-primary-600 font-semibold hover:underline">Mark all as read</button>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h2>
              <Link
                to="/student/assignments"
                className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:border-primary-100 hover:bg-primary-50/30 transition-all group"
              >
                <div className="p-1.5 bg-gray-50 group-hover:bg-primary-100 rounded text-gray-500 group-hover:text-primary-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-primary-850">Browse Assignments</span>
              </Link>
            </div>

            {/* Recent Submissions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Recent Coursework Submissions</h2>
              {submissions.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No data available</p>
              ) : (
                <div className="space-y-2.5">
                  {submissions.slice(0, 3).map((sub) => (
                    <div key={sub._id} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-xs">
                      <p className="font-medium text-gray-700 truncate">{sub.assignment?.title || 'Assignment'}</p>
                      <div className="flex items-center justify-between mt-1 text-gray-400 text-[11px]">
                        <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                        {sub.score !== null ? (
                          <span className="font-bold text-emerald-600 bg-emerald-50 px-1 rounded">{sub.score}%</span>
                        ) : (
                          <span className="text-amber-600 bg-amber-50 px-1 rounded">Pending</span>
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