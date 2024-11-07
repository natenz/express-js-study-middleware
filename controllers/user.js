// controllers/user.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const connection = require('./database'); // Pastikan mengimpor koneksi ke database

const login = (req, res) => {
    const { username, password } = req.body;
  
    // Validasi user (misalnya menggunakan data hardcoded atau query ke database)
    if (username === 'admin' && password === 'password') {
      // Membuat JWT token
      const payload = {
        username: username,
        role: 'admin'  // Anda bisa menambahkan data lain sesuai kebutuhan
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ message: 'Login berhasil', token });
    } else {
      res.status(401).json({ message: 'Username atau password salah' });
    }
  };
// Fungsi untuk mendapatkan semua data dari tabel user
const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM user'; // Ganti 'user' dengan nama tabel yang sesuai

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error mengambil data pengguna:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
    }
    // Mengirimkan hasil query ke client
    res.json(results);
  });
};

module.exports = { login, getAllUsers };
