import EmployeeSalary from '../models/employeeSalaryModel';

const createEmployeeSalary = async (req, res) => {
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
};

export default { createEmployeeSalary };
