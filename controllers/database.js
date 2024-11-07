const mysql = require('mysql2');

// Buat koneksi
const connection = mysql.createConnection({
    host: 'localhost',  // atau '127.0.0.1'
    port: 3306, //root SQL nya
    user: 'root',       // default user MySQL di XAMPP
    password: '',       // biasanya kosong di XAMPP, sesuaikan jika ada password
    database: 'expressdb', // ganti dengan nama database kamu

});

// Hubungkan ke MySQL
connection.connect((err) => {
    if (err) {
        console.error('Koneksi ke MySQL gagal:', err.message);
        return;
    }
    console.log('Koneksi ke MySQL berhasil!');
});

module.exports = connection;
