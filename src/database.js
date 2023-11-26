const { createPool } = require("mysql2/promise");
const { database } = require("./config.js");

const pool = createPool(database);

/*
pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOLO_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if (connection) connection.release()
    console.log('DB IS CONNECTED')
    return
})
*/
//pool.query = promisify(pool.query)

pool.getConnection()
    .then((connection) => {
        console.log('Connected to database!')
    })
    .catch((error) => {
        console.error(error);
    });

module.exports = pool

