import Assignment from '../models/Assignment.js';

// Admin creates assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, questions } = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      createdBy: req.user._id,
      questions,
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all assignments (for admin and students)
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('createdBy', 'name');

    res.json(assignments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get single assignment by id (with full questions)
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('createdBy', 'name');
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin can delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Assignment removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};