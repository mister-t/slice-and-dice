import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.post('/salaries', controllers.createEmployeeSalary);

export default router;
