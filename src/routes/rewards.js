const express = require('express');
const router = express.Router();
const RewardController = require('../controllers/RewardController');
const { authMiddleware, requireRole } = require('../middleware/auth');

router.post('/', authMiddleware, requireRole(['teacher', 'admin']), RewardController.create);
router.get('/', authMiddleware, RewardController.getMyRewards);
router.delete('/:id', authMiddleware, requireRole(['teacher', 'admin']), RewardController.delete);

module.exports = router;
