import { Router } from 'express';
import controllers from '../controllers/index.js';

const router = Router();

router.get('/', controllers.getEmployeeSalaries);
router.post('/', controllers.createEmployeeSalary);
router.delete('/:id', controllers.deleteEmployeeSalary);

export default router;
