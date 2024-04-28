const mongoose = require('mongoose');

//Membuat Schema
const Dokter = mongoose.model('Dokter', {
    idDokter: { 
      type: Number, 
      required: true 
  },
    namaDokter: { 
      type: String, 
      required: true 
  },
    poli: { 
      type: String, 
      required: true 
  },
    deskripsi: { 
      type: String, 
      required: true 
  }
  });

  module.exports = Dokter