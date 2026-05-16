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
});


// ======================
// GET PROFILE
// ======================

router.get('/me', protect, async (req, res) => {

  try {

    const user = await User
      .findById(req.user._id)
      .select('-password');

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
        message: 'User not found',
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.department = department || user.department;
    user.semester = semester || user.semester;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();

    res.json(updatedUser);

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
          message: 'User not found',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: 'No image uploaded',
        });
      }

      user.profileImage =
        `http://localhost:5000/uploads/${req.file.filename}`;

      const updatedUser = await user.save();

      res.json(updatedUser);

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

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isMatch =
      await user.matchPassword(currentPassword);

    if (!isMatch) {

      return res.status(401).json({
        message: 'Current password is incorrect',
      });

    }

    user.password = newPassword;

    await user.save();

    res.json({
      message: 'Password updated successfully',
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;