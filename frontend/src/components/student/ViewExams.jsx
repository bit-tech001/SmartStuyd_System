import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ViewExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/exams')
      .then(res => setExams(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">Available Exams</h1>
          <p className="mt-2 text-gray-600">Take exams created by your faculty</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {exams.length === 0 ? (
          <div className="card p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Exams Available</h3>
            <p className="text-gray-500">Check back later for new exams</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div key={exam._id} className="card p-6 hover:border-primary-300 transition-all">
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">{exam.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-500">{exam.duration} minutes</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{exam.questions?.length || 0} questions</p>
                <button
                  onClick={() => navigate(`/student/exam/${exam._id}`)}
                  className="btn-primary w-full"
                >
                  Take Exam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewExams;