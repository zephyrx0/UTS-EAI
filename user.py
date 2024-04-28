from flask import Flask, jsonify, request, session, redirect, url_for, render_template
from datetime import datetime
from flask import Flask, render_template
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB config
app.config['MONGO_URI'] = 'mongodb+srv://ganelajeisa:ganelajeisa@cluster0.4ula36n.mongodb.net/user'
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

# Register route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Ambil data dari form
        nama = request.form['namaUser']
        email = request.form['email']
        password = request.form['password']
        
        # Cek apakah email sudah ada dalam database
        user = mongo.db.user.find_one({'email': email})
        if user:
            return jsonify({"message": "Email already exists"}), 400
        
        # Tambahkan user baru ke database
        mongo.db.user.insert_one({
            'namaUser': nama,
            'email': email,
            'password': password,
            'created_at': datetime.now()
        })
        
        return jsonify({"message": "Registration successful"}), 201
    
    return render_template('register.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Ambil data dari form
        email = request.form['email']
        password = request.form['password']
        
        # Cek apakah user ada dalam database dan passwordnya cocok
        user = mongo.db.user.find_one({'email': email, 'password': password})
        
        if user:
            # Set session untuk user yang berhasil login
            session['email'] = email
            return redirect(url_for('dashboard'))
        else:
            return jsonify({"message": "Invalid email or password"}), 401
    
    return render_template('login.html')

# Dashboard route
@app.route('/dashboard')
def dashboard():
    # Cek apakah user sudah login
    if 'email' in session:
        email = session['email']
        user = mongo.db.user.find_one({'email': email})
        nama = user['namaUser']
        return f"Welcome to the dashboard, {nama}!"
    else:
        return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)