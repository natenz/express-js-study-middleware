// controllers/user.js
const {findUserByUsername } = require ('../model/karyawan.user');
const {addUsers,updateUser} = require('../model/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');


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
  const search = req.query.search || '';
  let query = 'SELECT * FROM user'; // Ganti 'user' dengan nama tabel yang sesuai

  if(search){
    query += ' WHERE nama_user LIKE ? OR alamat_user LIKE ? ';
  }
  const searchValue = `%${search}%`;
  connection.query(query, [searchValue,searchValue], (err, results) => {
    if (err) {
      console.error('Error mengambil data pengguna:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
    }
    // Mengirimkan hasil query ke client
    const currentUser = req.user.username; // Data username sudah ada dalam req.user setelah melalui authMiddleware

    // Menyertakan informasi login ke response
    res.json({
      message: 'Data pengguna berhasil diambil.',
      currentUser, // Menampilkan siapa yang sedang login
      users: results // Menampilkan hasil query pengguna yang ditemukan
    });
  });
};

const detailUser = (req, res) => {
  const userId = req.params.id; 

  let query = 'SELECT * FROM user WHERE id_user = ?'; 
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error mengambil data pengguna:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengguna.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const currentUser = req.user.username;
    res.json({
      message: 'Data pengguna berhasil diambil.',
      currentUser, 
      userDetails: results[0], 
    });
  });
};

const updateUserController = (req, res) => {
  const userId = req.params.id;  
  const { nama_user, alamat_user } = req.body;  
  updateUser(userId, nama_user, alamat_user, (err, result) => {
    if (err) {
      console.error('Error memperbarui data pengguna:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui data pengguna.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.json({ message: 'Data pengguna berhasil diperbarui.' });
  });
};



module.exports = { login, getAllUsers , detailUser, updateUserController};
