import EmployeeSalary from '../models/employeeSalaryModel';

const createEmployeeSalary = async (req, res) => {
  const { body } = req;
  if (!body) res.status(400);

  const { name, salary, currency, on_contract, department, sub_department } =
    req.body;
  // name: 'Test User',
  // salary: 100000,
  // currency: 'USD',
  // on_contract: true,
  // department: 'Engineering',
  // sub_deparment: 'Platform',
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
