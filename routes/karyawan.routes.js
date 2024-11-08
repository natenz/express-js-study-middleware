const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const KaryawanController = require('../controllers/karyawan');


router.post('/register', KaryawanController.registerKaryawan);


module.exports = router;