//Menggunakan express
const express = require('express')
const router = express.Router();

const { body, validationResult, Check } = require('express-validator')

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()
const port = 3000

//Menggunakan database mongodb

let db = require('./utils/db');
const Dokter = require('./model/dokters');
// const Janji = require('./model/janji');

//Menggunakan EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.use(cookieParser('secret'));
app.use(session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Endpoint untuk mencari semua dokter
app.get('/infodokter', async (req, res) => {
  const dokter = await Dokter.find();
  res.json(dokter)
})

// Endpoint untuk mencari dokter berdasarkan idDokter
app.get('/infodokter/:idDokter', async (req, res) => {
  try {
    const idDokter = req.params.idDokter;
    const dokter = await Dokter.findOne({ idDokter: idDokter });
    if (!dokter) {
      return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    }
    res.json(dokter);
  } catch (error) {
    console.error('Terjadi kesalahan saat mencari dokter:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mencari dokter' });
  }
});
 
app.listen(port, () => {
  console.log(`Layanan Manajemen Janji | listening at http://localhost:${port}`)
})