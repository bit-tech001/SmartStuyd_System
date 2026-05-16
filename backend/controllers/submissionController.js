import mongoose from 'mongoose';
import Submission from '../models/Submission.js';
import ExamResult from '../models/ExamResult.js';
import Assignment from '../models/Assignment.js';
import Exam from '../models/Exam.js';

// =============================================
// STUDENT CONTROLLERS
// =============================================

// Student submits assignment
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, answers } = req.body;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: 'Invalid assignment ID' });
    }
    
    // Check if assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Prevent duplicate submission
    const existing = await Submission.findOne({ 
      assignment: assignmentId, 
      student: req.user._id 
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already submitted this assignment' });
    }

    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user._id,
      answers,
    });
    
    res.status(201).json(submission);
  } catch (err) {
    console.error('submitAssignment error:', err);
    res.status(500).json({ message: 'Server error submitting assignment' });
  }
};

// Student submits exam
export const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: 'Invalid exam ID' });
    }
    
    // Check if exam exists
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    // Prevent duplicate submission
    const existing = await ExamResult.findOne({ 
      exam: examId, 
      student: req.user._id 
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already taken this exam' });
    }

    // Auto-score exam
    let score = 0;
    exam.questions.forEach((q) => {
      const studentAnswer = answers.find(a => a.questionId === q._id.toString());
      if (studentAnswer && q.options[studentAnswer.selectedOption]?.isCorrect) {
        score++;
      }
    });

    // Calculate percentage
    const percentageScore = exam.questions.length > 0 
      ? Math.round((score / exam.questions.length) * 100) 
      : 0;

    const result = await ExamResult.create({
      exam: examId,
      student: req.user._id,
      answers,
      score: percentageScore,
    });
    
    res.status(201).json(result);
  } catch (err) {
    console.error('submitExam error:', err);
    res.status(500).json({ message: 'Server error submitting exam' });
  }
};

// Student: Get my own submissions
export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate('assignment', 'title description dueDate')
      .sort({ submittedAt: -1 });
    
    res.json(submissions);
  } catch (err) {
    console.error('getMySubmissions error:', err);
    res.status(500).json({ message: 'Server error fetching submissions' });
  }
};

// Student: Get my own exam results
export const getMyExamResults = async (req, res) => {
  try {
    const results = await ExamResult.find({ student: req.user._id })
      .populate('exam', 'title duration')
      .sort({ submittedAt: -1 });
    
    res.json(results);
  } catch (err) {
    console.error('getMyExamResults error:', err);
    res.status(500).json({ message: 'Server error fetching exam results' });
  }
};


// =============================================
// ADMIN CONTROLLERS
// =============================================

// Admin: Get all submissions for a specific assignment
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: 'Invalid assignment ID' });
    }
    
    const submissions = await Submission.find({ assignment: assignmentId })
      .populate('student', 'name email')
      .populate('assignment', 'title')
      .sort({ submittedAt: -1 });
    
    res.json(submissions);
  } catch (err) {
    console.error('getSubmissionsByAssignment error:', err);
    res.status(500).json({ message: 'Server error fetching submissions' });
  }
};

// Admin: Get a single submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid submission ID' });
    }
    
    const submission = await Submission.findById(id)
      .populate('student', 'name email')
      .populate('assignment', 'title description questions');
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    res.json(submission);
  } catch (err) {
    console.error('getSubmissionById error:', err);
    res.status(500).json({ message: 'Server error fetching submission' });
  }
};

// Admin: Rate/grade a submission
// export const rateSubmission = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { score } = req.body;
    
//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid submission ID' });
//     }
    
//     // Validate score
//     const numScore = Number(score);
//     if (isNaN(numScore) || numScore < 0 || numScore > 100) {
//       return res.status(400).json({ message: 'Score must be a number between 0 and 100' });
//     }
    
//     const submission = await Submission.findById(id);
//     if (!submission) {
//       return res.status(404).json({ message: 'Submission not found' });
//     }
    
//     submission.score = numScore;
//     submission.gradedBy = req.user._id;
//     await submission.save();
    
//     // Return updated submission with populated fields
//     const updatedSubmission = await Submission.findById(id)
//       .populate('student', 'name email')
//       .populate('assignment', 'title');
    
//     res.json(updatedSubmission);
//   } catch (err) {
//     console.error('rateSubmission error:', err);
//     res.status(500).json({ message: 'Server error grading submission' });
//   }
// };

// Admin: Get exam results for a specific exam
export const getExamResultsByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: 'Invalid exam ID' });
    }
    
    const results = await ExamResult.find({ exam: examId })
      .populate('student', 'name email')
      .sort({ submittedAt: -1 });
    
    res.json(results);
  } catch (err) {
    console.error('getExamResultsByExam error:', err);
    res.status(500).json({ message: 'Server error fetching exam results' });
  }
};


export const rateSubmission = async (req, res) => {
  try {
    const { score } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      { score },
      { new: true }
    );

    res.json(submission);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to rate submission',
    });
  }
};