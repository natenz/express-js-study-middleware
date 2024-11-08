const { addKaryawan} = require ('../model/karyawan.user');
const bcrypt = require('bcrypt');

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

module.exports = { registerKaryawan };