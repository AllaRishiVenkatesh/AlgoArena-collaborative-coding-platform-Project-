const mongoose = require('mongoose')

const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      console.log("No MONGODB_URL found in .env, starting in-memory MongoDB...");
      const mongod = await MongoMemoryServer.create();
      mongoUrl = mongod.getUri();
      console.log("In-memory MongoDB started at:", mongoUrl);
    }

    await mongoose.connect(mongoUrl);
    console.log("connected to database");
  } catch (e) {
    console.log("Some Error while connecting to Database", e);
  }
};

connectDB();

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  programExecutions: {
    type: Number,
    default: 0
  }
});

const RoomSchema = mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', RoomSchema);
module.exports = {
  User,
  Room
}