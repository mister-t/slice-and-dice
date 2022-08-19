import mongoose from 'mongoose';

const employeeSalarySchema = mongoose.Schema({
  name: { required: true, type: String },
  salary: { required: true, type: Number },
  currency: {
    required: true,
    type: String,
    enum: ['USD', 'EUR', 'INR'],
  },
  on_contract: { required: false, type: Boolean },
  department: { required: true, type: String },
  sub_department: { required: false, type: String },
});

const EmployeeSalary = mongoose.model('EmployeeSalary', employeeSalarySchema);

export default EmployeeSalary;
