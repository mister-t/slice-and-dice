import EmployeeSalary from '../models/employeeSalaryModel';
import asyncHandler from 'express-async-handler';
import { ERR_MSG_CREATE, ERR_MSG_DELETE } from '../constants/errorMessages';

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
    throw new Error(ERR_MSG_CREATE);
  }
});

const deleteEmployeeSalary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`employee id to be deleted: ${id}`);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
    throw new Error(ERR_MSG_DELETE);
  }
});

export default { createEmployeeSalary, deleteEmployeeSalary };
