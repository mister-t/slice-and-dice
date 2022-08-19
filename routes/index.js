import { Router } from 'express';
import controllers from '../controllers/index.js';

const router = Router();

router.post('/salaries', controllers.createEmployeeSalary);
router.delete('/salaries/:id', controllers.deleteEmployeeSalary);

export default router;
