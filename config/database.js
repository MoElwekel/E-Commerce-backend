const mongoose = require('mongoose');


//connect with db
const dbConnection =()=>{
  mongoose.connect(process.env.DB_URI)
  .then((conn)=>{
    console.log(`Database Connected: ${conn.connection.host}`)
  })
}


module.exports = dbConnection;