import Exam from '../models/Exam.js';

export const createExam = async (req, res) => {
  try {
    const { title, duration, questions } = req.body;
    const exam = await Exam.create({
      title,
      duration,
      createdBy: req.user._id,
      questions,
    });
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getExams = async (req, res) => {
  const exams = await Exam.find({
     createdBy: req.user._id
  }).populate('createdBy', 'name');
  res.json(exams);
};

export const getExamById = async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate('createdBy', 'name');
  if (!exam) 
    return res.status(404).json({ message: 'Exam not found' });
  res.json(exam);
};

export const deleteExam = async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.json({ message: 'Exam deleted' });
};