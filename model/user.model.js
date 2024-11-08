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

module.exports = { addUsers };