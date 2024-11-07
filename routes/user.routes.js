const express = require('express')
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');


router.get('/',authMiddleware, userController.getAllUsers);
router.post('/login', userController.login);


module.exports = router;