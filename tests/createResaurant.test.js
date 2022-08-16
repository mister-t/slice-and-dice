import { createRestaurant } from '../controllers/createRestaurant.js';

import Restaurant from '../models/restaurantModel.js';

import { connectDB, closeConn, clearColl } from '../config/db.js';

beforeAll(async () => await connectDB());
afterEach(async () => await clearColl());
afterAll(async () => await closeConn());

describe('Restaurants', () => {
  it('should exist when a restaurant is created', async () => {
    const { restaurantId } = await createRestaurant({
      name: 'Test Restaurant',
      location: 'San Francisco',
      budget: '$$',
    });

    const restaurant = await Restaurant.findById(restaurantId);

    expect(restaurant.name).toEqual('Test Restaurant');
    expect(restaurant.location).toEqual('San Francisco');
    expect(restaurant.budget).toEqual('$$');
  });
});
