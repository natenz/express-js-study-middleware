const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Mengambil token dari header Authorization
  
    if (!token) {
      return res.status(403).json({ message: 'Token tidak ditemukan, akses ditolak.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token tidak valid.' });
      }
      
      req.user = decoded; // Menyimpan data decoded dari token ke dalam request
      next(); // Melanjutkan ke route selanjutnya
    });
  };
  
  module.exports = authMiddleware;