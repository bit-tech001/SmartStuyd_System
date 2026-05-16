import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    api.get(`/exams/${id}`)
      .then(res => {
        setExam(res.data);
        setAnswers(res.data.questions.map(q => ({ questionId: q._id, selectedOption: null })));
        setTimeLeft(res.data.duration * 60);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers(prev => prev.map(a => 
      a.questionId === questionId ? { ...a, selectedOption: optionIndex } : a
    ));
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post('/submissions/exam', { 
        examId: id, 
        answers: answers.filter(a => a.selectedOption !== null)
      });
      navigate(`/student/exam-result/${res.data._id}`);
    } catch (err) {
      alert('Exam submission failed');
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 60;
  const progress = answers.filter(a => a.selectedOption !== null).length;
  const total = exam?.questions?.length || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Exam not found</h2>
          <button onClick={() => navigate(-1)} className="btn-primary mt-4">Go Back</button>
        </div>
      </div>
    );
  }

  const question = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Timer & Progress Header */}
      <div className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        isLowTime ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-display font-bold text-gray-900">{exam.title}</h1>
            
            {/* Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold ${
              isLowTime 
                ? 'bg-red-100 text-red-600 animate-pulse-glow' 
                : 'bg-primary-100 text-primary-700'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
          
          {/* Question Navigation */}
          <div className="flex justify-center gap-2 mt-3">
            {exam.questions.map((q, index) => (
              <button
                key={q._id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                  index === currentQuestion
                    ? 'bg-primary-600 text-white shadow-lg'
                    : answers[index]?.selectedOption !== null
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-8 animate-fadeIn">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge badge-primary">Q{currentQuestion + 1}</span>
              <span className="text-sm text-gray-500">{progress}/{total} answered</span>
            </div>
            <h2 className="text-2xl font-display font-semibold text-gray-900">
              {question.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, optIndex) => (
              <label
                key={optIndex}
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  answers[currentQuestion]?.selectedOption === optIndex
                    ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-100'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
                onClick={() => handleOptionChange(question._id, optIndex)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                    answers[currentQuestion]?.selectedOption === optIndex
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion]?.selectedOption === optIndex && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-lg ${
                    answers[currentQuestion]?.selectedOption === optIndex
                      ? 'text-primary-900 font-semibold'
                      : 'text-gray-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            {currentQuestion < total - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(total - 1, prev + 1))}
                className="btn-primary"
              >
                Next
                <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary bg-green-600 hover:bg-green-700"
              >
                Submit Exam
                <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;