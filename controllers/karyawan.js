const { addKaryawan} = require ('../model/karyawan.user');
const bcrypt = require('bcrypt');
const {addUsers} = require('../model/user.model');

const registerKaryawan = (req, res) => {
  const { username, password } = req.body;
  
  // Hash password sebelum disimpan
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });
    
    addKaryawan(username, hashedPassword, (error, result) => {
      if (error) return res.status(500).json({ message: 'Error adding user' });
      res.status(201).json({ message: 'User added successfully' });
    });
  });
};

const addUser = (req, res) => {
  const { nama_user, alamat_user } = req.body; 

  addUsers(nama_user, alamat_user, (err, result) => {
    if (err) {
      console.error('Gagal menambahkan pengguna:', err.message);
      return res.status(500).json({ message: 'Gagal menambahkan pengguna.' });
    }
    res.status(201).json({ message: 'Pengguna berhasil ditambahkan.', data: result });
  });
};

module.exports = { registerKaryawan,addUser };