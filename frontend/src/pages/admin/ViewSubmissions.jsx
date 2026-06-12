import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ViewSubmissions = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, assignRes] = await Promise.all([
          api.get(`/submissions/assignment/${assignmentId}`),
          api.get(`/assignments/${assignmentId}`)
        ]);
        setSubmissions(subRes.data);
        setAssignment(assignRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch submissions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [assignmentId]);

  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (sortBy === 'name') return (a.student?.name || '').localeCompare(b.student?.name || '');
    if (sortBy === 'score') return (a.score || 0) - (b.score || 0);
    return new Date(b.submittedAt) - new Date(a.submittedAt);
  });

  const getScoreColor = (score) => {
    if (score === null || score === undefined) return 'text-yellow-600 bg-yellow-100';
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Assignments
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Submissions for {assignment?.title || 'Assignment'}
              </h1>
              <p className="mt-2 text-gray-600">
                {submissions.length} student{submissions.length !== 1 ? 's' : ''} submitted
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                className="input-field w-40"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {submissions.length === 0 ? (
          <div className="card p-12 text-center animate-fadeIn">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Submissions Yet</h3>
            <p className="text-gray-500">Students haven't submitted this assignment yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedSubmissions.map((submission, index) => (
              <div 
                key={submission._id} 
                className="card p-6 animate-slideUp group hover:border-primary-200"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {submission.student?.name?.charAt(0) || 'S'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {submission.student?.name || 'Unknown Student'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {submission.student?.email || 'No email'}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">
                          Submitted: {new Date(submission.submittedAt).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400">
                          Answers: {submission.answers?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className={`px-4 py-2 rounded-full font-semibold text-sm ${getScoreColor(submission.score)}`}>
                      {submission.score !== null && submission.score !== undefined
                        ? `${submission.score}%`
                        : 'Not Graded'}
                    </div>
                    <button
                      onClick={() => navigate(`/faculty/rate/${submission._id}`)}
                      className="btn-primary flex items-center gap-2 whitespace-nowrap"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {submission.score !== null ? 'Update Grade' : 'Grade'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSubmissions;