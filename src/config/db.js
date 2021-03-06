const mysql = require('mysql');

const conexion_bd = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

function handleDisconnect(conexion_bd){
    connection = mysql.createPool(conexion_bd);

    connection.getConnection(function(err){
        if(err){
            console.log("error al conectarse", err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err){
        console.log('db error', err);
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            handleDisconnect();
        } else {
            throw err;
        }
    })
}

handleDisconnect(conexion_bd);

module.exports = connection;