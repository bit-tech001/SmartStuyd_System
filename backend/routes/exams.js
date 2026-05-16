import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { createExam, getExams, getExamById, deleteExam } from '../controllers/examController.js';

const router = express.Router();
router.route('/')
  .get(protect, getExams)
  .post(protect, authorize('admin'), createExam);
router.route('/:id')
  .get(protect, getExamById)
  .delete(protect, authorize('admin'), deleteExam);
export default router;