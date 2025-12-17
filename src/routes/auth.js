const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const { authMiddleware } = require('../middleware/auth');
const { rateLimit } = require('../middleware/rateLimit');

const router = express.Router();

// Register (rate-limited)
router.post('/register', rateLimit({ windowMs: 15*60*1000, max: 5 }), [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'teacher', 'parent', 'admin']).withMessage('Invalid role')
], AuthController.register);

// Login (rate-limited)
router.post('/login', rateLimit({ windowMs: 15*60*1000, max: 10 }), [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], AuthController.login);

// Admin Login (rate-limited)
router.post('/admin/login', rateLimit({ windowMs: 15*60*1000, max: 10 }), [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], AuthController.adminLogin);

// Get Me
router.get('/me', authMiddleware, AuthController.getMe);

// Complete Onboarding
router.post('/onboarding/complete', authMiddleware, AuthController.completeOnboarding);

// OTP Generation (rate-limited)
router.post('/generate-otp', authMiddleware, rateLimit({ windowMs: 15*60*1000, max: 5 }), AuthController.generateOTP);

// Forgot Password (rate-limited)
router.post('/forgot-password', rateLimit({ windowMs: 15*60*1000, max: 5 }), AuthController.forgotPassword);

// Reset Password (rate-limited)
router.post('/reset-password', rateLimit({ windowMs: 15*60*1000, max: 5 }), [
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], AuthController.resetPassword);

module.exports = router;
