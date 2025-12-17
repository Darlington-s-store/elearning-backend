const express = require('express');
const BehaviourController = require('../controllers/BehaviourController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const { requireStudentAccess } = require('../middleware/authorization');

const router = express.Router();

// Create behaviour record (teachers only)
router.post('/', authMiddleware, requireRole(['teacher', 'admin']), BehaviourController.createRecord);

// Get student behaviour records
router.get('/student/:studentId', authMiddleware, requireStudentAccess('studentId'), BehaviourController.getStudentRecords);

// Get behaviour summary
router.get('/summary/:studentId', authMiddleware, requireStudentAccess('studentId'), BehaviourController.getSummary);

module.exports = router;
