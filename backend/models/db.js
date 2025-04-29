const mysql = require('mysql2/promise');

// Buat koneksi pool
const connection = mysql.createPool
({
  host: '127.0.0.1',    
  user: 'root',         
  password: 'root',         
  database: 'pos_system', 
});



module.exports = connection;
