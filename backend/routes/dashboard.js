const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Exam = require('../models/Exam');
const Submission = require('../models/Submission');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

router.get('/student', protect, async (req, res) => {
  try {
    const assignments = await Assignment.find();
    const exams = await Exam.find();
    
    const submittedAssignments = await Submission.find({
      student: req.user._id,
      type: 'assignment'
    });
    
    const submittedExams = await Submission.find({
      student: req.user._id,
      type: 'exam'
    });

    const pendingAssignments = assignments.filter(
      assignment => !submittedAssignments.some(sub => sub.assignment?.toString() === assignment._id.toString())
    );

    const pendingExams = exams.filter(
      exam => !submittedExams.some(sub => sub.exam?.toString() === exam._id.toString())
    );

    const allSubmissions = [...submittedAssignments, ...submittedExams];
    const averageScore = allSubmissions.length > 0 
      ? (allSubmissions.reduce((sum, sub) => sum + (sub.percentage || 0), 0) / allSubmissions.length).toFixed(1)
      : 0;

    res.json({
      totalAssignments: assignments.length,
      totalExams: exams.length,
      completedAssignments: submittedAssignments.length,
      completedExams: submittedExams.length,
      pendingAssignments: pendingAssignments.length,
      pendingExams: pendingExams.length,
      averageScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/admin', protect, admin, async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAssignments = await Assignment.countDocuments();
    const totalExams = await Exam.countDocuments();
    const totalSubmissions = await Submission.countDocuments();

    const recentSubmissions = await Submission.find()
      .populate('student', 'name email')
      .populate('assignment', 'title')
      .populate('exam', 'title')
      .sort({ submittedAt: -1 })
      .limit(10);

    res.json({
      totalStudents,
      totalAssignments,
      totalExams,
      totalSubmissions,
      recentSubmissions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/recent-activity', protect, async (req, res) => {
  try {
    const recentActivity = await Submission.find()
      .populate('student', 'name')
      .populate('assignment', 'title')
      .populate('exam', 'title')
      .sort({ submittedAt: -1 })
      .limit(5);
    res.json(recentActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;