import { useState } from 'react';
import api from '../../services/api';

const AssignmentForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: [{ text: '', isCorrect: false }] }
  ]);

  // AI State
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [generating, setGenerating] = useState(false);

  // AI Logic
 const generateAssignmentAI = async () => {
  try {
    setGenerating(true);

  const res = await api.post(
  "/ai/generate-assignment",
  {
    subject,
    topic,
    difficulty,
    questionCount,
  }
);

console.log(res.data);

const assignment = res.data.assignment;

setTitle(assignment?.title || "");
setDescription(
  assignment?.description || ""
);
setQuestions(
  assignment?.questions || []
);
  } catch (error) {
    console.error(error);
  } finally {
    setGenerating(false);
  }
};

  // Manual Editor Logic
  const addQuestion = () => setQuestions([...questions, { questionText: '', options: [{ text: '', isCorrect: false }] }]);
  const removeQuestion = (qIdx) => { if (questions.length > 1) setQuestions(questions.filter((_, idx) => idx !== qIdx)); };
  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push({ text: '', isCorrect: false });
    setQuestions(updated);
  };
  const removeOption = (qIdx, optIdx) => {
    if (questions[qIdx].options.length > 1) {
      const updated = [...questions];
      updated[qIdx].options = updated[qIdx].options.filter((_, idx) => idx !== optIdx);
      setQuestions(updated);
    }
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
      updated[qIdx].options.forEach((opt, i) => { if (i !== optIdx) opt.isCorrect = false; });
    }
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter an assignment title');
    onSubmit({ title, description, dueDate, questions });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      
      {/* 1. AI Generation Card */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold">✨ AI Assignment Assistant</h3>
          <p className="text-violet-100 text-sm">Generate structured quizzes instantly using AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl placeholder:text-white/60 outline-none" />
          <input type="text" placeholder="Topic" value={topic} onChange={e => setTopic(e.target.value)} className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl placeholder:text-white/60 outline-none" />
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none text-white [&>option]:text-gray-900">
            <option>Easy</option><option>Medium</option><option>Hard</option>
          </select>
          <button type="button" onClick={generateAssignmentAI} disabled={generating} className="bg-white text-indigo-700 font-bold rounded-xl hover:bg-gray-100 transition-all">
            {generating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </section>

      {/* 2. Manual Editor Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Manual Assignment Editor</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <input type="text" placeholder="Assignment Title" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-500/20 outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
          <input type="date" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-500/20 outline-none" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <textarea placeholder="Description" className="md:col-span-2 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h4 className="font-bold text-gray-900">Questions ({questions.length})</h4>
            <button type="button" onClick={addQuestion} className="text-sm font-bold text-primary-600 hover:text-primary-700">+ Add Question</button>
          </div>

          {questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Question {qIdx + 1}</span>
                {questions.length > 1 && <button type="button" onClick={() => removeQuestion(qIdx)} className="text-gray-400 hover:text-red-500">✕</button>}
              </div>
              <input type="text" placeholder="Question text..." className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-200 outline-none" value={q.questionText} onChange={e => handleQuestionChange(qIdx, 'questionText', e.target.value)} required />
              
              <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-3">
                    <input type="radio" name={`correct-${qIdx}`} checked={opt.isCorrect} onChange={() => handleOptionChange(qIdx, optIdx, 'isCorrect', true)} className="w-4 h-4 text-primary-600" />
                    <input type="text" placeholder={`Option ${optIdx + 1}`} className="flex-1 px-3 py-2 rounded-lg border border-gray-200" value={opt.text} onChange={e => handleOptionChange(qIdx, optIdx, 'text', e.target.value)} required />
                    {q.options.length > 1 && <button type="button" onClick={() => removeOption(qIdx, optIdx)} className="text-gray-400 hover:text-red-500">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addOption(qIdx)} className="text-xs font-bold text-primary-600 hover:underline">+ Add Option</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-10 pt-8 border-t">
          <button type="button" onClick={() => window.history.back()} className="px-6 py-3 font-bold text-gray-500">Cancel</button>
          <button type="submit" className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20">Save Assignment</button>
        </div>
      </div>
    </form>
  );
};

export default AssignmentForm;