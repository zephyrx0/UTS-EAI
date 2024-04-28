const mongoose = require('mongoose');

const Janji = mongoose.model('Janji', {
    idUser: { 
      type: Number, 
  },
    namaUser: { 
      type: String, 
  },
    idDokter: { 
      type: Number, 
  },
    namaDokter: { 
      type: String, 
  },
    poli: { 
      type: String, 
  },
    tanggalJanji: { 
      type: String, 
  },
    keterangan: { 
      type: String, 
  }
  });

module.exports = Janji

