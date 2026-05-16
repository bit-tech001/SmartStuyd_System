import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { createAssignment, getAssignments, getAssignmentById, deleteAssignment } from '../controllers/assignmentController.js';

const router = express.Router();
router.route('/')
  .get(protect, getAssignments)
  .post(protect, authorize('admin'), createAssignment);
router.route('/:id')
  .get(protect, getAssignmentById)
  .delete(protect, authorize('admin'), deleteAssignment);
export default router;