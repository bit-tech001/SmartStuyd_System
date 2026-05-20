import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  selectedOption: { type: Number, required: true }, // index of chosen option
});

const submissionSchema = new mongoose.Schema({
  assignment: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Assignment', required: true },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true },
  answers: [answerSchema],
  
  score: { type: Number,
     default: null }, // set by admin

  gradedBy: { type: mongoose.Schema.Types.ObjectId,
     ref: 'User' },

  submittedAt: { type: Date,
     default: Date.now },
});

export default mongoose.model('Submission', submissionSchema);