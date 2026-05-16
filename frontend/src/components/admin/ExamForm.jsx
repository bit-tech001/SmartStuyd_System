import { useState } from 'react';

const ExamForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([
    { questionText: '', options: [{ text: '', isCorrect: false }] }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [{ text: '', isCorrect: false }] }]);
  };

  const removeQuestion = (qIdx) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, idx) => idx !== qIdx));
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push({ text: '', isCorrect: false });
    setQuestions(updated);
  };

  const removeOption = (qIdx, optIdx) => {
    if (questions[qIdx].options.length === 1) return;
    const updated = [...questions];
    updated[qIdx].options = updated[qIdx].options.filter((_, idx) => idx !== optIdx);
    setQuestions(updated);
  };

  const handleQuestionChange = (qIdx, field, value) => {
    const updated = [...questions];
    updated[qIdx][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, field, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx][field] = value;
    if (field === 'isCorrect' && value) {
      updated[qIdx].options.forEach((opt, i) => {
        if (i !== optIdx) opt.isCorrect = false;
      });
    }
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter an exam title');
      return;
    }
    if (duration < 1) {
      alert('Duration must be at least 1 minute');
      return;
    }
    const hasValidQuestions = questions.every(q => 
      q.questionText.trim() && 
      q.options.every(opt => opt.text.trim()) &&
      q.options.some(opt => opt.isCorrect)
    );
    if (!hasValidQuestions) {
      alert('Each question must have text, all options filled, and at least one correct answer');
      return;
    }
    onSubmit({ title, duration, questions });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">Create New Exam</h3>
      
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exam Title *</label>
          <input
            type="text"
            placeholder="Enter exam title"
            className="input-field"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) *</label>
          <div className="relative">
            <input
              type="number"
              placeholder="30"
              className="input-field pl-10"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              min="1"
              required
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-1">Students will have this many minutes to complete the exam</p>
        </div>
      </div>

      {/* Questions */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-display font-semibold text-gray-900">
            Questions ({questions.length})
          </h4>
          <button
            type="button"
            onClick={addQuestion}
            className="btn-secondary text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Question
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <span className="badge bg-green-100 text-green-700">Question {qIdx + 1}</span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIdx)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Enter question text"
                className="input-field mb-4"
                value={q.questionText}
                onChange={e => handleQuestionChange(qIdx, 'questionText', e.target.value)}
                required
              />

              <div className="space-y-2 ml-4">
                <label className="text-sm font-medium text-gray-700">Options</label>
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`correct-exam-${qIdx}`}
                      checked={opt.isCorrect}
                      onChange={() => handleOptionChange(qIdx, optIdx, 'isCorrect', true)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder={`Option ${optIdx + 1}`}
                      className="input-field flex-1"
                      value={opt.text}
                      onChange={e => handleOptionChange(qIdx, optIdx, 'text', e.target.value)}
                      required
                    />
                    {q.options.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(qIdx, optIdx)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(qIdx)}
                  className="text-green-600 text-sm hover:text-green-700 flex items-center gap-1 mt-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Option
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
        <button type="button" onClick={() => window.history.back()} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary bg-green-600 hover:bg-green-700 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Create Exam
        </button>
      </div>
    </form>
  );
};

export default ExamForm;