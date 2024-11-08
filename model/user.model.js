const connection = require('../controllers/database');

const addUsers = (nama_user, alamat_user, callback ) => {
    const sql = 'INSERT INTO user (nama_user, alamat_user ) VALUES ( ?, ?)';
    connection.query(sql, [nama_user,alamat_user], (err,result) =>{
        if(err){
            return callback(err, null);
        }
        callback(null,result);
});
};

const updateUser = (id_user, nama_user, alamat_user,callback) => {
    const query = 'UPDATE user SET nama_user = ?, alamat_user = ? WHERE id_user = ?';
    connection.query(query, [nama_user,alamat_user,id_user], (err,result)=> {
        if (err) {
            return callback(err, null);
          }
          callback(null, result);
    })
}

module.exports = { addUsers, updateUser };