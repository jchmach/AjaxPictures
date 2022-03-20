const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

var connect =  function(){
    console.log(process.env.MONGO_CONNECT);
    mongoose.connect(
        process.env.MONGO_CONNECT,
        {
            useNewUrlParser: true
        },
        function(){
            console.log("Connected to DB");
        }
    )
}

module.exports = {connectDB: connect};