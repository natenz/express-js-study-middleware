// controllers/user.js
const {findUserByUsername } = require ('../model/karyawan.user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');


const connection = require('./database'); // Pastikan mengimpor koneksi ke database

const login = (req, res) => {
  const { username, password } = req.body;

  // Cari user berdasarkan username
  findUserByUsername(username, (err, user) => {
      if (err) {
          return res.status(500).json({ message: 'Terjadi kesalahan server!', error: err });
      }
      if (!user) {
          return res.status(401).json({ message: 'Username/Password Salah!' });
      }

      // Bandingkan password yang diinput dengan password yang tersimpan di database
      bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) {
              return res.status(500).json({ message: 'Error saat verifikasi password!', error });
          }
          if (!isMatch) {
              return res.status(401).json({ message: 'Username/Password Salah!' });
          }

          // Jika password cocok, buat token JWT
          const payload = {
              username: user.username,
              role: 'Karyawan'
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
          res.json({ message: 'Login berhasil', token });
      });
  });
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

const addUsers = (req,res) => {
  const query = 'INSERT INTO user nama'
}

module.exports = { login, getAllUsers };
