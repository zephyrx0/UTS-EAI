from flask import Flask, render_template, request, jsonify
from flask import redirect, url_for, session
import requests

app = Flask(__name__)

app.secret_key = 'cobain'

@app.route('/ulasan/<id>')
def ulasan(id):
    # Make sure that the `id` parameter is correctly formatted
    # Convert `id` to an integer if necessary
    id_int = int(id)

    # Retrieve user info
    ulasan_response = requests.get(f'http://127.0.0.1:3002/ulasan/{id_int}')
    ulasan = ulasan_response.json()

    # Check if the `ulasan` object is empty and handle the case
    if ulasan:
        # Render the template with ulasan information
        return render_template('detail_ulasan.html', ulasan=ulasan)
    else:
        # Handle the case when `ulasan` is empty
        return "Ulasan not found", 404

@app.route('/user/<id>')
def user(id):
    # Retrieve user information
    user_response = requests.get(f'http://127.0.0.1:3003/user/{id}')
    user = user_response.json()['user']

@app.route('/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Mendapatkan data dari permintaan
        data = request.form

        # Memanggil endpoint /register dari UserApp
        response = requests.post('http://localhost:3003/register', data=data)

        # Jika registrasi berhasil, redirect ke halaman login
        if response.status_code == 200:
            return redirect(url_for('login'))
        else:
            # Mengembalikan respons dari UserApp jika terjadi error
            return response.content, response.status_code
    else:
        # Render the template with paket liburan data
        return render_template('register.html')
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Mendapatkan data dari permintaan
        data = request.form

        # Memanggil endpoint /login dari UserApp
        response = requests.post('http://localhost:3003/login', data=data)

        # Jika login berhasil, set session dan redirect ke halaman dashboard
        if response.status_code == 200:
            return redirect(url_for('dashboard'))
        else:
            # Mengembalikan respons dari UserApp jika terjadi error
            return response.content, response.status_code
    else:
        # Render halaman login
        return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    # Cek apakah user sudah login
    if 'email' in session:          
        # Render the template with paket liburan data
        return render_template('dashboard.html')
    else:
        # Redirect ke halaman login jika belum login
        return redirect(url_for('login'))
    
@app.route('/listDokter')
def listDokter():
    if 'email' in session:          
        # Render the template with paket liburan data
        return render_template('listDokter.html')
    else:
        # Redirect ke halaman login jika belum login
        return redirect(url_for('login'))
def method_name():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3004, debug=True)