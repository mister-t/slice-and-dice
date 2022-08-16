import colors from 'colors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = await MongoMemoryServer.create();

export const connectDB = async () => {
  try {
    const URI = mongod.getUri();
    const conn = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`connected to DB: ${conn.connection.host}`.bgGreen.underline);
  } catch (err) {
    console.log(`DB connection error: ${err.message}`.bgRed.underline);
    process.exit(1);
  }
};

export const closeConn = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearColl = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
