import EmployeeSalary from '../models/employeeSalaryModel.js';
import asyncHandler from 'express-async-handler';
import {
  ERR_MSG_CREATE,
  ERR_MSG_DELETE,
  ERR_MSG_DELETE_ID_NOT_FOUND,
} from '../constants/errorMessages.js';

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
    const result = await EmployeeSalary.deleteOne({ _id: id }); //1 if success, 0 if can not find doc with id

    if (result.deletedCount > 0) {
      return res.sendStatus(204);
    }
    throw new Error(`${ERR_MSG_DELETE_ID_NOT_FOUND}: ${id}`);
  } catch (err) {
    res.status(400);
    throw new Error(err.message || `${ERR_MSG_DELETE}: ${id}`);
  }
});

export default { createEmployeeSalary, deleteEmployeeSalary };
