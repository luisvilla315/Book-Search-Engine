const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/books';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI, OPTIONS);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

connectToDb();

module.exports = mongoose.connection;
