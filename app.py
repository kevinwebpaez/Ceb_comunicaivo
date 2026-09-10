from flask import Flask, render_template, request, redirect, url_for, session, flash
import pymysql
from functools import wraps

app = Flask(__name__)
app.secret_key = 'ceb_secret_key_2026'

# Conexión a MySQL en phpMyAdmin
def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',  # Modifica si tu usuario 'root' tiene contraseña
        database='ceb_comunicativo',
        cursorclass=pymysql.cursors.DictCursor
    )

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def root():
    if 'user_id' in session:
        return redirect(url_for('index'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            conn = get_db_connection()
            with conn.cursor() as cursor:
                sql = 'SELECT * FROM usuarios WHERE email = %s AND hash_password = %s'
                cursor.execute(sql, (email, password))
                user = cursor.fetchone()
            conn.close()

            if user:
                session['user_id'] = user['id_usuario']
                session['user_name'] = user['nombres']
                session['user_role'] = user.get('rol', 'Estudiante')
                return redirect(url_for('index'))
            else:
                flash('Correo o contraseña incorrectos.', 'error')
        except Exception as e:
            flash(f'Error de conexión: {e}', 'error')

    return render_template('login.html')

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        tipo_doc = request.form['tipo_doc']
        numero_doc = request.form['numero_doc']
        nombres = request.form['nombres']
        apellidos = request.form['apellidos']
        email = request.form['email']
        telefono = request.form.get('telefono', '')
        password = request.form['password']
        id_rol = request.form['id_rol']

        try:
            conn = get_db_connection()
            with conn.cursor() as cursor:
                # 1. Insertar en la tabla 'usuarios'
                sql_usuario = '''
                    INSERT INTO usuarios (tipo_doc, numero_doc, nombres, apellidos, email, telefono, hash_password, id_rol)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                '''
                cursor.execute(sql_usuario, (tipo_doc, numero_doc, nombres, apellidos, email, telefono, password, id_rol))
                
                # 2. Obtener el ID del usuario recién creado
                id_nuevo_usuario = cursor.lastrowid

                # 3. Insertar relación en 'usuario_rol' (asignado_por guarda el mismo ID del usuario)
                sql_rol = '''
                    INSERT INTO usuario_rol (id_usuario, id_rol, asignado_por)
                    VALUES (%s, %s, %s)
                '''
                cursor.execute(sql_rol, (id_nuevo_usuario, id_rol, id_nuevo_usuario))

            conn.commit()
            conn.close()
            return redirect(url_for('login'))

        except Exception as e:
            print(f"\n--- ERROR DE REGISTRO ---\n{e}\n------------------------\n")
            flash(f"Error al registrar: {e}", 'error')

    return render_template('registro.html')

@app.route('/index')
@app.route('/inicio')
@login_required
def index():
    id_usuario_logueado = session['user_id'] 
    
    try:
        conn = get_db_connection() 
        with conn.cursor() as cursor:
            # Trae el código/nombre del rol desde la base de datos
            sql = """
                SELECT u.*, COALESCE(r.codigo, r.nombre, 'SIN ROL') AS nombre_rol 
                FROM usuarios u
                LEFT JOIN usuario_rol ur ON u.id_usuario = ur.id_usuario
                LEFT JOIN roles r ON (r.id_rol = ur.id_rol OR r.id_rol = u.id_rol)
                WHERE u.id_usuario = %s
                LIMIT 1
            """
            cursor.execute(sql, (id_usuario_logueado,))
            usuario = cursor.fetchone()
        
        conn.close()
        return render_template('index_2.html', usuario=usuario)

    except Exception as e:
        print(f"Error cargando inicio: {e}")
        flash("Hubo un problema al cargar tu perfil.", "error")
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)