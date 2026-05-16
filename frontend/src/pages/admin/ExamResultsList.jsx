import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ExamResultsList = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultsRes, examRes] = await Promise.all([
          api.get(`/submissions/exam/${examId}`),
          api.get(`/exams/${examId}`)
        ]);
        setResults(resultsRes.data);
        setExam(examRes.data);
      } catch (err) {
        setError('Failed to load exam results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [examId]);

  const averageScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length)
    : 0;

  const highestScore = results.length > 0
    ? Math.max(...results.map(r => r.score || 0))
    : 0;

  const lowestScore = results.length > 0
    ? Math.min(...results.map(r => r.score || 0))
    : 0;

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
          <h2 className="text-2xl font-bold text-gray-900">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button onClick={() => navigate(-1)} className="btn-primary mt-4">Go Back</button>
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
            Back to Exams
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Results: {exam?.title || 'Exam'}
            </h1>
            <p className="mt-2 text-gray-600">
              {results.length} student{results.length !== 1 ? 's' : ''} completed
              {exam && ` • ${exam.duration} min • ${exam.questions?.length || 0} questions`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card p-4 text-center animate-slideUp">
            <p className="text-sm text-gray-500 mb-1">Average Score</p>
            <p className="text-3xl font-display font-bold text-primary-700">{averageScore}%</p>
          </div>
          <div className="card p-4 text-center animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <p className="text-sm text-gray-500 mb-1">Highest Score</p>
            <p className="text-3xl font-display font-bold text-green-600">{highestScore}%</p>
          </div>
          <div className="card p-4 text-center animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm text-gray-500 mb-1">Lowest Score</p>
            <p className="text-3xl font-display font-bold text-red-600">{lowestScore}%</p>
          </div>
        </div>

        {/* Results Table */}
        {results.length === 0 ? (
          <div className="card p-12 text-center animate-fadeIn">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
            <p className="text-gray-500">No students have taken this exam</p>
          </div>
        ) : (
          <div className="card overflow-hidden animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Email</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Score</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Date</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {results.map((result, index) => (
                    <tr key={result._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {result.student?.name?.charAt(0) || 'S'}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {result.student?.name || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {result.student?.email || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          (result.score || 0) >= 80 ? 'bg-green-100 text-green-700' :
                          (result.score || 0) >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {result.score || 0}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-sm text-gray-500">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {(result.score || 0) >= 60 ? (
                          <span className="text-green-600 flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Passed
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamResultsList;