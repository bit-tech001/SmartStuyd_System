import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SubmitAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/assignments/${id}`)
      .then(res => {
        setAssignment(res.data);
        setAnswers(res.data.questions.map(q => ({ questionId: q._id, selectedOption: null })));
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers(prev => prev.map(a => 
      a.questionId === questionId ? { ...a, selectedOption: optionIndex } : a
    ));
  };

  const handleSubmit = async () => {
    if (!window.confirm('Are you sure you want to submit this assignment?')) return;
    
    setSubmitting(true);
    try {
      await api.post('/submissions/assignment', { 
        assignmentId: id, 
        answers: answers.filter(a => a.selectedOption !== null)
      });
      navigate('/student/dashboard', { 
        state: { message: 'Assignment submitted successfully!' }
      });
    } catch (err) {
      alert('Submission failed: ' + (err.response?.data?.message || 'Please try again'));
    } finally {
      setSubmitting(false);
    }
  };

  const progress = answers.filter(a => a.selectedOption !== null).length;
  const total = assignment?.questions?.length || 0;
  const progressPercent = total > 0 ? (progress / total) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Assignment not found</h2>
          <button onClick={() => navigate(-1)} className="btn-primary mt-4">Go Back</button>
        </div>
      </div>
    );
  }

  const question = assignment.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Progress */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-display font-bold text-gray-900">{assignment.title}</h1>
              <p className="text-sm text-gray-500">{assignment.description}</p>
            </div>
            <button 
              onClick={() => navigate('/student/assignments')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progress} of {total} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            {/* Question Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {assignment.questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuestion
                      ? 'bg-primary-600 w-6'
                      : answers[index]?.selectedOption !== null
                      ? 'bg-primary-300'
                      : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-8 animate-fadeIn">
          {/* Question Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <span className="badge badge-primary mb-3">
                Question {currentQuestion + 1} of {total}
              </span>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mt-2">
                {question.questionText}
              </h2>
            </div>
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

          {/* Navigation Buttons */}
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
                disabled={submitting || progress < total}
                className="btn-primary bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Assignment
                    <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignment;