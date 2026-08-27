const express = require('express');
const router = express.Router();
const axios = require('axios');

// الاتصال بخوادم Aternos
router.get('/list', async (req, res) => {
    try {
        // هنا ستضع كود الاتصال بـ API الخاص بـ Aternos
        res.json({
            success: true,
            servers: [
                {
                    id: 1,
                    name: 'Server 1',
                    ip: 'server1.aternos.org',
                    status: 'online',
                    players: 5,
                    maxPlayers: 20
                }
            ]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطأ في الاتصال بالخوادم'
        });
    }
});

// بدء الخادم
router.post('/:serverId/start', async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'تم بدء الخادم'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطأ في بدء الخادم'
        });
    }
});

// إيقاف الخادم
router.post('/:serverId/stop', async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'تم إيقاف الخادم'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطأ في إيقاف الخادم'
        });
    }
});

module.exports = router;
