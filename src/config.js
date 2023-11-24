const { config } = require("dotenv");
config();

const port = process.env.port || 3000

//DATABASE CONFIG
const database = {
    connectionLimit: 10,
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "aliaxdev",
    password: process.env.DATABASE_PASSWORD || "password",
    database: process.env.DATABASE_NAME || "linksdb",
    port: process.env.DATABASE_PORT || 3306,
}

//SECRET
const SECRET = process.env.SECRET || 'some secret key';

//EXPORT 
module.exports = {
    SECRET,
    database,
    port
}