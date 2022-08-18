import mongoose from 'mongoose';
import colors from 'colors';
import Salary from '../models/salaryModel.js';
import { connectDB, closeConn } from '../config/db.js';

const importData = async () => {
  try {
    await connectDB();
    await Salary.deleteMany();
    console.log(`Data import successful!`.bgGreen);
  } catch (err) {
    console.log(`Data import failed: ${err.message}`.bgRed);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await connectDB();
    await Salary.deleteMany();
    await closeConn();
  } catch (err) {
    console.log(`Data deletion failed: ${err.message}`.bgRed);
  }
};
