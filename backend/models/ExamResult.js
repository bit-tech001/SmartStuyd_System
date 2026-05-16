import mongoose from 'mongoose';

const examAnswerSchema = new mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  selectedOption: Number,
});

const examResultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [examAnswerSchema],
  score: { type: Number, default: null }, // auto-calculated or admin assigned
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model('ExamResult', examResultSchema);