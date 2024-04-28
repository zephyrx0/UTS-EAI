const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://ganelajeisa:ganelajeisa@cluster0.4ula36n.mongodb.net/janji');

//Menambah 1 data
// const newPasien = new Pasien({
//   namaLengkap: 'John Doe',
//   tanggalLahir: new Date('1990-01-01'),
//   jenisKelamin: 'Laki-laki',
//   nohp: '081234567890',
//   email: 'johndoe@example.com'
// });

// //Simpan data ke collection
// newPasien.save().then((result) => {
//   console.log(result, 'Data berhasil disimpan');
// }).catch((error) => {
//   console.log('Gagal menyimpan data: ', error);
// });
