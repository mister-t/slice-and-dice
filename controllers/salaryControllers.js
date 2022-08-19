import EmployeeSalary from '../models/employeeSalaryModel.js';
import asyncHandler from 'express-async-handler';
import {
  ERR_MSG_CREATE,
  ERR_MSG_DELETE,
  ERR_MSG_DELETE_ID_NOT_FOUND,
  ERR_MSG_NO_SALARIES_FOUND,
} from '../constants/errorMessages.js';

const getEmployeeSalaries = asyncHandler(async (req, res) => {
  const salaries = await EmployeeSalary.find({});
  if (salaries.length) {
    res.status(200);
    res.json(salaries);
  } else {
    res.status(204);
    throw new Error(ERR_MSG_NO_SALARIES_FOUND);
  }
});

const getSummaryStatistics = asyncHandler(async (req, res) => {
  //find the mean, max, and min of salaryies by the currency
  const pipeline = [];

  const { on_contract, by_dept, by_sub_dept, currency } = req.query;

  const matches = {};
  if (on_contract === 'true') matches['on_contract'] = true;
  if (currency) matches['currency'] = currency.toUpperCase();

  let groupings = {
    $group: {
      _id: '$currency',
      mean: { $avg: '$salary' },
      max: { $max: '$salary' },
      min: { $min: '$salary' },
    },
  };
  if (by_dept === 'true' && by_sub_dept === 'true') {
    groupings.$group = {
      ...groupings.$group,
      _id: {
        currency: '$currency',
        department: '$department',
        sub_department: '$sub_department',
      },
    };
  } else if (by_dept === 'true') {
    groupings.$group = {
      ...groupings.$group,
      _id: { currency: '$currency', department: '$department' },
    };
  }

  if (Object.keys(matches).length) pipeline.push({ $match: matches });
  pipeline.push(groupings);
  let stats = await EmployeeSalary.aggregate([pipeline]);

  if (stats.length) {
    res.status(200).json({ stats });
  } else {
    res.status(204);
    throw new Error(ERR_MSG_NO_SALARIES_FOUND);
  }
});

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

export default {
  getEmployeeSalaries,
  getSummaryStatistics,
  createEmployeeSalary,
  deleteEmployeeSalary,
};
