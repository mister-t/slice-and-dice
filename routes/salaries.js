import { Router } from 'express';
import controllers from '../controllers/salaryControllers.js';

const router = Router();

router.get('/', controllers.getEmployeeSalaries);
router.get('/statistics', controllers.getSummaryStatistics);
router.post('/', controllers.createEmployeeSalary);
router.delete('/:id', controllers.deleteEmployeeSalary);

export default router;
