export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const submissions = await Submission.find({ assignment: req.params.assignmentId })
      .populate('student', 'name email')
      .populate('assignment', 'title');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};