const connection = require('../controllers/database');



const addKaryawan = (username, password, callback ) => {
    const sql = 'INSERT INTO karyawan (username, password ) VALUES ( ?, ?)';
    connection.query(sql, [username,password], (err,result) =>{
        if(err){
            return callback(err, null);
        }
        callback(null,result);
});
};

const findUserByUsername = (username, callback) => {
    const sql = 'SELECT * FROM karyawan WHERE username = ?';
    
    connection.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error saat melakukan query:', err.message);
            return callback(err, null);
        }
        
        if (results.length === 0) {
            // Tidak ada user dengan username yang dicari
            console.log('User tidak ditemukan:', username);
            return callback(null, null);
        }
        
        // Hasil query jika user ditemukan
        console.log('User ditemukan:', results[0]);
        callback(null, results[0]);
    });
};

module.exports = { findUserByUsername };

  
  module.exports = { addKaryawan, findUserByUsername };