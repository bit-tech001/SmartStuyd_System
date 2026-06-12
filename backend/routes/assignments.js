import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { createAssignment, getAssignments, getAssignmentById, deleteAssignment } from '../controllers/assignmentController.js';

const router = express.Router();
router.route('/')
  .get(protect, getAssignments)
  .post(protect, authorize('faculty'), createAssignment);
router.route('/:id')
  .get(protect, getAssignmentById)
  .delete(protect, authorize('faculty'), deleteAssignment);
export default router;