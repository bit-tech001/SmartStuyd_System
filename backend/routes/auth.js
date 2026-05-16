import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import  {protect }from '../middleware/auth.js';
import User from '../models/User.js';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
export default router;



// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { protect } = require('../middleware/auth');





// =========================
// GET PROFILE
// =========================

router.get(
  '/me',
  protect,

  async (req, res) => {

    try {

      const user =
        await User.findById(req.user._id)
          .select('-password')
          .lean();

      res.json(user);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);