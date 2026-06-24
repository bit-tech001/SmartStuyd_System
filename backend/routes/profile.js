const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// ======================
// MULTER CONFIG
// ======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit safeguard
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Error: Only images (jpeg, jpg, png, webp) are allowed!'));
  }
});

// ======================
// GET PROFILE
// ======================
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User
      .findById(req.user._id)
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User record not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// UPDATE PROFILE
// ======================
router.put('/me', protect, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      semester,
      bio,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'User record not found.',
      });
    }

    // Using explicit nullish checks (??) instead of fallback (||)
    // This allows users to explicitly clear out inputs like bio or phone fields if desired
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.department = department ?? user.department;
    user.semester = semester ?? user.semester;
    user.bio = bio ?? user.bio;

    const updatedUser = await user.save();
    
    // Omit password hash string from the update output response safely
    const responseData = updatedUser.toObject();
    delete responseData.password;

    res.json(responseData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// UPLOAD PROFILE IMAGE
// ======================
router.put(
  '/upload-profile',
  protect,
  upload.single('profileImage'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          message: 'User record not found.',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: 'No image resource selected for delivery.',
        });
      }

      // Dynamic path handling matching target upload schemas
      user.profileImage = `/uploads/${req.file.filename}`;

      const updatedUser = await user.save();
      
      const responseData = updatedUser.toObject();
      delete responseData.password;

      res.json(responseData);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// ======================
// CHANGE PASSWORD
// ======================
router.put('/change-password', protect, async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Both current password and new password strings are required.',
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'User record not found.',
      });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Current verification password signature is invalid.',
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      message: 'Password updated successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;