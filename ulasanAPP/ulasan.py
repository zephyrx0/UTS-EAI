from flask import Flask, jsonify, request, session, redirect, url_for, render_template
from datetime import datetime
from flask import Flask, render_template
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB config
app.config['MONGO_URI'] = 'mongodb+srv://ganelajeisa:ganelajeisa@cluster0.4ula36n.mongodb.net/ulasan'
mongo = MongoClient(app.config['MONGO_URI'])


app.secret_key = 'cobain'

def create_response(data, status_code, message):
    response = {
        'timestamp': datetime.now().isoformat(),
        'status': status_code,
        'message': message,
        'data': data
    }
    return jsonify(response)

@app.route('/ulasan', methods=['GET', 'POST'])
def ulasan():
    if request.method == 'GET':
        ulasan_collection = mongo.db.ulasan
        data = list(ulasan_collection.find())
        return create_response(data, 200, 'Success')

    elif request.method == 'POST':
        try:
            # Ambil data dari request JSON
            id_ulasan = request.json['idUlasan']
            id_dokter = request.json['idDokter']
            id_user = request.json['idUser']
            nama_user = request.json['namaUser']
            nama_dokter = request.json['namaDokter']
            poli = request.json['poli']
            ulasan_text = request.json['ulasan']

            # Simpan ulasan ke database
            ulasan_collection = mongo.db.ulasan
            ulasan_collection.insert_one({
                'idUlasan': id_ulasan,
                'idDokter': id_dokter,
                'idUser': id_user,
                'namaUser': nama_user,
                'namaDokter': nama_dokter,
                'poli': poli,
                'ulasan': ulasan_text
            })

            return create_response(None, 201, 'Ulasan berhasil ditambahkan')
        except KeyError:
            return create_response(None, 400, 'Permintaan tidak valid: Kolom yang dibutuhkan tidak ada')

# Detail ulasan route
@app.route('/detailulasan')
def detailulasan():
    parameters = request.args.to_dict()

    if parameters:
        ulasan_collection = mongo.db.ulasan

        # Membangun query berdasarkan parameter yang diberikan
        query = {}
        for key, value in parameters.items():
            query[key] = value

        data = list(ulasan_collection.find(query))

        if data:
            return create_response(data, 200, 'Success')
        else:
            return create_response(None, 404, 'Not Found: Ulasan not found')
    else:
        return create_response(None, 400, 'Bad Request: No parameters provided')





@app.route('/tambah_ulasan')
def tambah_ulasan():
    return render_template('tambah_ulasan.html')

@app.route('/detail_ulasan')
def detail_ulasan():
    return render_template('detail_ulasan.html')



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)