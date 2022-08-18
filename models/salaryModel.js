import mongoose from 'mongoose';

const salarySchema = mongoose.Schema({
  name: { required: true, type: String },
  salary: { required: true, type: Number },
  currency: {
    required: true,
    type: String,
    enum: ['USD', 'EUR', 'INDR'],
  },
  on_contract: { required: false, type: Boolean },
  department: { required: true, type: String },
  sub_department: { required: false, type: String },
});

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
