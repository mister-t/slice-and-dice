const createSalary = async (req, res) => {
  res.status(201).json(req.body);
};

export default { createSalary };
