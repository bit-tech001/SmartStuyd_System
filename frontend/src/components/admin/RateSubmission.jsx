import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const RateSubmission = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        // Use the generic GET route
        const res = await api.get(`/submissions/${submissionId}`);
        setSubmission(res.data);
        setScore(res.data.score || 0);
      } catch (err) {
        console.error('Fetch error:', err.response || err);
        setError(err.response?.data?.message || 'Failed to load submission');
      } finally {
        setLoading(false);
      }
    };
    
    if (submissionId) {
      fetchSubmission();
    }
  }, [submissionId]);

  const handleRate = async () => {
    const numScore = Number(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      setError('Score must be a number between 0 and 100');
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Use the new rate route
      const res = await api.put(`/submissions/rate/${submissionId}`, { 
        score: numScore 
      });
      setSuccess('Grade saved successfully!');
      setTimeout(() => navigate(-1), 1000);
    } catch (err) {
      console.error('Rate error:', err.response || err);
      setError(err.response?.data?.message || 'Failed to save grade');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submission...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary-600 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-green-700">{success}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <span className="text-sm font-medium text-red-700">{error}</span>
              <button onClick={() => setError('')} className="ml-2 text-red-400 hover:text-red-600">✕</button>
            </div>
          )}

          {submission && (
            <>
              {/* Student Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">
                    {submission.student?.name?.charAt(0) || 'S'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{submission.student?.name || 'Student'}</h2>
                <p className="text-gray-500">{submission.student?.email}</p>
              </div>

              {/* Score Input */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Grade (0-100)</label>
                
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 25, 50, 75, 100].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setScore(value)}
                      className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
                        score === value
                          ? 'bg-primary-600 text-white shadow-lg scale-110'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-lg font-bold">{value}</span>
                      <span className="text-xs">%</span>
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600 mb-2"
                />

                <div className="flex items-center gap-3 justify-center mt-4">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-24 px-4 py-2 border-2 border-gray-200 rounded-xl text-center text-lg font-bold focus:border-primary-500 focus:outline-none"
                  />
                  <span className="text-lg font-bold text-gray-700">%</span>
                </div>

                <div className="text-center mt-4">
                  <span className={`text-5xl font-bold ${
                    score >= 80 ? 'text-green-500' :
                    score >= 60 ? 'text-yellow-500' :
                    score > 0 ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {score}%
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button onClick={() => navigate(-1)} className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={handleRate}
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-primary-700 to-primary-500 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? 'Saving...' : 'Save Grade'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateSubmission;