const express = require('express');
const ProgressController = require('../controllers/ProgressController');
const { authMiddleware } = require('../middleware/auth');
const { requireStudentAccess } = require('../middleware/authorization');

const router = express.Router();

// Track lesson view
router.post('/lesson-view', authMiddleware, ProgressController.trackLessonView);

// Get student progress
router.get('/student/:studentId', authMiddleware, requireStudentAccess('studentId'), ProgressController.getStudentProgress);

// Get analytics
router.get('/analytics/:studentId', authMiddleware, requireStudentAccess('studentId'), ProgressController.getAnalytics);

module.exports = router;
