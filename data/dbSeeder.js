import mongoose from 'mongoose';
import colors from 'colors';
import EmployeeSalary from '../models/employeeSalaryModel.js';
import { connectDB, closeConn } from '../config/db.js';
import salaries from '../data/seed.js';

export const importData = async () => {
  try {
    // await connectDB();
    await EmployeeSalary.deleteMany();
    await EmployeeSalary.insertMany(salaries);
    console.log(`Data import successful!`.bgGreen);
  } catch (err) {
    console.log(`Data import failed: ${err.message}`.bgRed);
  }
};

export const deleteData = async () => {
  try {
    await connectDB();
    await EmployeeSalary.deleteMany();
    await closeConn();
  } catch (err) {
    console.log(`Data deletion failed: ${err.message}`.bgRed);
  }
};
