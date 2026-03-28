const express = require('express');
const router = express.Router();

const { registerController, loginController, getMe, logoutController } = require('../controllers/user');
const requireAuth = require('../middlewares/authmiddleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me',requireAuth, getMe);
router.get('/logout',requireAuth, logoutController);
router.get('/healthy',(req, res)=>{
    res.json({
        message:"Server Healthy"
    })
});

module.exports = router;
