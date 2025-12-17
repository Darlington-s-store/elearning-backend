const MessagingModel = require('../models/MessagingModel');

class MessagingService {
    static async sendMessage(data) {
        return await MessagingModel.sendMessage(data);
    }

    static async getInbox(userId) {
        return await MessagingModel.getInbox(userId);
    }

    static async getSent(userId) {
        return await MessagingModel.getSent(userId);
    }

    static async markAsRead(messageId) {
        return await MessagingModel.markAsRead(messageId);
    }

    static async createAnnouncement(data) {
        return await MessagingModel.createAnnouncement(data);
    }

    static async getAnnouncements(filters) {
        return await MessagingModel.getAnnouncements(filters);
    }
}

module.exports = MessagingService;
