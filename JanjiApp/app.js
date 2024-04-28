//Menggunakan express
const express = require('express')
const router = express.Router();

const { body, validationResult, Check } = require('express-validator')

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()
const port = 3001

//Menggunakan database mongodb

let db = require('./utils/db');
const Janji = require('./model/janji');

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


app.get('/infojanji', async (req, res) => {
  console.log('Menerima permintaan /infojanji');
  try {
    const janji = await Janji.find();
    res.json(janji);
  } catch (error) {
    console.error('Terjadi kesalahan saat mencari janji:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mencari janji' });
  }
})

  // Endpoint untuk mencari janji berdasarkan idJanji
app.get('/infojanji/:idJanji', async (req, res) => {
  try {
    const idJanji = req.params.idJanji;
    const janji = await Janji.findOne({ idJanji: idJanji });
    if (!janji) {
      return res.status(404).json({ message: 'Janji tidak ditemukan' });
    }
    res.json(janji);
  } catch (error) {
    console.error('Terjadi kesalahan saat mencari janji:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mencari janji' });
  }
});

  
app.listen(port, () => {
  console.log(`Layanan Manajemen Janji | listening at http://localhost:${port}`)
})