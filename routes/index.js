import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.post('/salaries', controllers.createEmployeeSalary);
router.delete('/salaries/:id', controllers.deleteEmployeeSalary);

export default router;
