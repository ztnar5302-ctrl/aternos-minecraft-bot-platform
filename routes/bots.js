const express = require('express');
const router = express.Router();

// قاعدة بيانات مؤقتة
let botsDB = [];

// الحصول على جميع البوتات
router.get('/', (req, res) => {
    res.json({
        success: true,
        bots: botsDB
    });
});

// إنشاء بوت جديد
router.post('/create', (req, res) => {
    const { name, serverIP, type, edition, uptime } = req.body;

    if (!name || !serverIP || !type) {
        return res.status(400).json({
            success: false,
            message: 'البيانات المدخلة غير كاملة'
        });
    }

    const newBot = {
        id: botsDB.length + 1,
        name,
        serverIP,
        type,
        edition,
        uptime,
        status: 'online',
        createdAt: new Date()
    };

    botsDB.push(newBot);

    res.json({
        success: true,
        message: 'تم إنشاء البوت بنجاح',
        bot: newBot
    });
});

// حذف بوت
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    botsDB = botsDB.filter(bot => bot.id !== parseInt(id));

    res.json({
        success: true,
        message: 'تم حذف البوت بنجاح'
    });
});

// تحديث حالة البوت
router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const bot = botsDB.find(b => b.id === parseInt(id));
    if (bot) {
        bot.status = status;
    }

    res.json({
        success: true,
        bot
    });
});

module.exports = router;
