import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ExamResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/submissions/my-exam-results')
      .then(res => {
        const found = res.data.find(r => r._id === id);
        setResult(found);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Result not found</h2>
          <button onClick={() => navigate('/student/dashboard')} className="btn-primary mt-4">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const percentage = result.score || 0;
  const getGradeColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMessage = (score) => {
    if (score >= 80) return 'Excellent work!';
    if (score >= 60) return 'Good job!';
    return 'Keep practicing!';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full animate-slideUp">
        <div className="card p-8 text-center">
          {/* Score Circle */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80" cy="80" r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="80" cy="80" r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                className={`${getGradeColor(percentage)} transition-all duration-1000`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className={`text-5xl font-display font-bold ${getGradeColor(percentage)}`}>
                {percentage}%
              </span>
              <p className="text-sm text-gray-500 mt-1">Score</p>
            </div>
          </div>

          {/* Result Details */}
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
            {getMessage(percentage)}
          </h2>
          <p className="text-gray-600 mb-6">
            {result.exam?.title || 'Exam'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-gray-900">{result.score || 0}/{result.answers?.length || 0}</p>
              <p className="text-sm text-gray-500">Correct Answers</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-gray-900">
                {new Date(result.submittedAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Date Taken</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="btn-primary flex-1"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/student/assignments')}
              className="btn-secondary flex-1"
            >
              More Exams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;