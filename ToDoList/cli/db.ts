const mongoose = require("mongoose");
const config = require('./config')

const connect = async () => {
    await mongoose.connect( config.configure.MONGODB_URI );
};

mongoose.connection.on('error', (err:any) => console.log(err))
const connectionDB = mongoose.connection

module.exports = {connect, connectionDB}
