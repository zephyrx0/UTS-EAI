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


app.get('/', async (req, res) => {
    const janji = await Janji.find();
    const dokter = await Dokter.find();

    res.render('index', {
      janji,
      dokter
    })
})

  app.get('/infojanji', async (req, res) => {
    const janji = await Janji.find();
    res.json(janji)
  })

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

// app.get('/janji', async (req, res) => {
//   try {
//     const poliList = await Dokter.find().distinct('poli');
//     const nextUserId = await getNextUserId();
//     const selectedPoli = req.query.poli || "";
//     res.render('janji', { 
//       poliList,
//       dokterList: [],
//       selectedPoli,
//       nextUserId
//      });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal Server Error');
//   }
  
// })

// Route untuk mendapatkan daftar dokter berdasarkan poli yang dipilih
app.post('/dokter', async (req, res) => {
  const { poli } = req.body;
  const poliList = await Dokter.find().distinct('poli');
  const nextUserId = await getNextUserId();
  const selectedPoli = req.query.poli;
  try {
    const dokterList = await Dokter.find({ poli }); // Mendapatkan daftar dokter berdasarkan poli yang dipilih
    res.render('janji', { poliList, dokterList, selectedPoli, nextUserId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// // Endpoint untuk menambahkan janji baru
// app.post('/janji', async (req, res) => {
//   try {
//     // Membaca data dari body request
//     const { idUser, namaUser, idDokter, namaDokter, poli, tanggalJanji, keterangan } = req.body;

//     // Membuat objek Janji baru
//     const newJanji = new Janji({
//       idUser,
//       namaUser,
//       idDokter,
//       namaDokter,
//       poli,
//       tanggalJanji,
//       keterangan
//     });

//     // Menyimpan janji ke database
//     await newJanji.save();

//     // Mengirim respon berhasil
//     res.status(201).json({ message: 'Janji berhasil dibuat', janji: newJanji });
//   } catch (error) {
//     // Menangani error jika terjadi
//     console.error('Error saat membuat janji:', error);
//     res.status(500).json({ message: 'Terjadi kesalahan saat membuat janji' });
//   }
// });

app.post('/janji', (req, res) => {
  const janji = req.body

  db.collection('janjis')
    .insertOne(janji)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({err: "Gagal membuat dokumen"})
    })
})

  
app.listen(port, () => {
  console.log(`Layanan Manajemen Janji | listening at http://localhost:${port}`)
})