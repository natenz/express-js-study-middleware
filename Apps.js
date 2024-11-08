require('dotenv').config({ path: '.env.default' });
const express = require('express');
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser'); 
const karyawanRoutes = require('./routes/karyawan.routes');
// app.js
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Route dasar
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
//create new API
app.use('/getUser', userRoutes);
app.use('/karyawan', karyawanRoutes);

// Server start
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
