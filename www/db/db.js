//conexion a la base de datos

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'hanamineposapp.000webhostapp.com',
  port: 3306, 
  user: 'id22418330_root', 
  password: 'pasenRepo123.', 
  database: 'id22418330_hanaminepos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = { pool, testConnection };