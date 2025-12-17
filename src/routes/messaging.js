const express = require('express');
const MessagingController = require('../controllers/MessagingController');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

// Send message
router.post('/send', authMiddleware, MessagingController.sendMessage);

// Get inbox
router.get('/inbox', authMiddleware, MessagingController.getInbox);

// Get sent
router.get('/sent', authMiddleware, MessagingController.getSent);

// Mark message as read
router.post('/:id/read', authMiddleware, MessagingController.markAsRead);

// Create announcement (teachers only)
router.post('/announcements', authMiddleware, requireRole(['teacher', 'admin']), MessagingController.createAnnouncement);

// Get announcements
router.get('/announcements', authMiddleware, MessagingController.getAnnouncements);

module.exports = router;
