// import express from 'express';
// import { protect } from '../middleware/auth.js';
// import { authorize } from '../middleware/role.js';
// import {
//   submitAssignment, submitExam,
//   getSubmissionsByAssignment,rateSubmission,
//   getExamResultsByExam, getMySubmissions, getMyExamResults
// } from '../controllers/submissionController.js';

// const router = express.Router();
// router.post('/assignment', protect, authorize('student'), submitAssignment);
// router.post('/exam', protect, authorize('student'), submitExam);
// router.get('/assignment/:assignmentId', protect, authorize('admin'), getSubmissionsByAssignment);
// router.put('/assignment/:id/rate', protect, authorize('admin'), rateSubmission);
// router.get('/exam/:examId', protect, authorize('admin'), getExamResultsByExam);
// router.get('/my-submissions', protect, authorize('student'), getMySubmissions);
// router.get('/my-exam-results', protect, authorize('student'), getMyExamResults);
// router.get('/:id', protect, authorize('admin'), getSubmissionsByAssignment);


// // // Admin routes - ORDER MATTERS! Specific routes first
// // router.get('/assignment/:assignmentId', protect, authorize('admin'), getSubmissionsByAssignment);
// // router.put('/assignment/:id/rate', protect, authorize('admin'), rateSubmission);
// // router.get('/:id', protect, authorize('admin'), getSubmissionById);  // This MUST be last
// // router.get('/exam/:examId', protect, authorize('admin'), getExamResultsByExam);

// export default router;


import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import {
  submitAssignment,
  submitExam,
  getSubmissionsByAssignment,
  getSubmissionById,
  rateSubmission,
  getExamResultsByExam,
  getMySubmissions,
  getMyExamResults
} from '../controllers/submissionController.js';

const router = express.Router();

// =============================================
// STUDENT ROUTES
// =============================================

// Student: Submit an assignment
router.post('/assignment', protect, authorize('student'), submitAssignment);

// Student: Submit an exam
router.post('/exam', protect, authorize('student'), submitExam);

// Student: Get my own submissions (for dashboard)
router.get('/my-submissions', protect, authorize('student'), getMySubmissions);

// Student: Get my own exam results
router.get('/my-exam-results', protect, authorize('student'), getMyExamResults);


// =============================================
// ADMIN ROUTES
// =============================================

// Admin: Get all submissions for a specific assignment
router.get('/assignment/:assignmentId', protect, authorize('admin'), getSubmissionsByAssignment);

// Admin: Rate/grade a submission
// router.put('/assignment/:id/rate', protect, authorize('admin'), rateSubmission);

// Admin: Get exam results for a specific exam
router.get('/exam/:examId', protect, authorize('admin'), getExamResultsByExam);

// Admin: Get a single submission by ID (MUST be last to avoid conflicts)
router.get('/:id', protect, authorize('admin'), getSubmissionById);
router.put('/rate/:submissionId', rateSubmission);

export default router;