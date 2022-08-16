import express from 'express';

const router = express.Router();

import { createRestaurant } from '../controllers/createRestaurant.js';

router.route('/').post(async (req, res) => {
  const { name, location, budget } = req.body;

  try {
    const { restaurantId } = await createRestaurant({ name, location, budget });

    res.json({
      restaurantId,
    });
  } catch (err) {
    const { message } = err;
    res.status(400).json({
      message,
    });
  }
});

export default router;
