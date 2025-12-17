const pool = require('../db/pool');

class RewardModel {
    static async create({ student_id, teacher_id, type, name, reason, awarded_at }) {
        const result = await pool.query(`
            INSERT INTO rewards (student_id, teacher_id, type, name, reason, awarded_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [student_id, teacher_id, type, name, reason, awarded_at || new Date()]);
        return result.rows[0];
    }

    static async getByTeacher(teacher_id) {
        const result = await pool.query(`
            SELECT r.*, u.name as student_name, u.avatar as student_avatar
            FROM rewards r
            JOIN users u ON r.student_id = u.id
            WHERE r.teacher_id = $1
            ORDER BY r.awarded_at DESC
        `, [teacher_id]);
        return result.rows;
    }

    static async getByStudent(student_id) {
        const result = await pool.query(`
            SELECT r.*, u.name as teacher_name
            FROM rewards r
            JOIN users u ON r.teacher_id = u.id
            WHERE r.student_id = $1
            ORDER BY r.awarded_at DESC
        `, [student_id]);
        return result.rows;
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM rewards WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    }
}

module.exports = RewardModel;
