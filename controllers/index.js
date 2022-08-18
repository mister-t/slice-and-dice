import EmployeeSalary from '../models/employeeSalaryModel';
import asyncHandler from 'express-async-handler';

const createEmployeeSalary = asyncHandler(async (req, res) => {
  try {
    const { body } = req;
    if (!body) res.status(400);

    const { name, salary, currency, on_contract, department, sub_department } =
      req.body;
    const employeeSalary = new EmployeeSalary({
      name,
      salary,
      currency,
      on_contract,
      department,
      sub_department,
    });

    await employeeSalary.save();
    res.status(201).json(employeeSalary);
  } catch (err) {
    res.status(400);
    throw new Error(`Please check that all required parameters are passed`);
  }
});

export default { createEmployeeSalary };
