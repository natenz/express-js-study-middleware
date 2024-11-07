require('dotenv').config({ path: '.env.default' });
const express = require('express');
const connection = require('./controllers/database');
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser'); 

// app.js
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

connection.connect((err)=> {
  if(err){
    console.error('Koneksi ke MYSQL Gagal !', err.message);
    return;
  }
  console.log("Koneksi ke MySQL Berhasil !");
  connection.query('SELECT DATABASE() AS dbName', (err, result) => {
    if (err) {
      console.error('Gagal mengambil nama database:', err.message);
      return;
    }
    // Log nama database
    console.log('Nama database yang terhubung:', result[0].dbName);
  });
})


// Route dasar
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
//create new API
app.use('/getUser', userRoutes);

// Server start
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
