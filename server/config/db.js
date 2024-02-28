const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      ssl: true,
    });
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Database failed to connect");
    throw error;
  }

}

module.exports = connectDB;