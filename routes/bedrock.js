const express = require('express');
const router = express.Router();

// إعدادات Bedrock Edition
router.get('/settings', (req, res) => {
    res.json({
        success: true,
        settings: {
            autoJoin: false,
            autoPlay: false,
            autoRespawn: true,
            chatLogging: true,
            skinSupport: true
        }
    });
});

// تحديث إعدادات Bedrock
router.put('/settings', (req, res) => {
    const { autoJoin, autoPlay, autoRespawn, chatLogging, skinSupport } = req.body;

    res.json({
        success: true,
        message: 'تم تحديث إعدادات Bedrock',
        settings: {
            autoJoin,
            autoPlay,
            autoRespawn,
            chatLogging,
            skinSupport
        }
    });
});

// قائمة أوامر Bedrock
router.get('/commands', (req, res) => {
    res.json({
        success: true,
        commands: [
            { command: '/say', description: 'إرسال رسالة للعبة' },
            { command: '/tp', description: 'نقل اللاعب' },
            { command: '/give', description: 'إعطاء عنصر' },
            { command: '/setblock', description: 'وضع كتلة' }
        ]
    });
});

module.exports = router;
