import { createRestaurant } from '../controllers/createRestaurant.js';

import Restaurant from '../models/restaurantModel.js';

import { connectDB, closeConn, clearColl } from '../config/db.js';

beforeAll(async () => await connectDB());
afterEach(async () => await clearColl());
afterAll(async () => await closeConn());

describe('when creating a restaurant', () => {
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

  it('should throw an error when a restaurant with the same name already exists', async () => {
    await createRestaurant({
      name: 'Test Restaurant',
      location: 'San Francisco',
      budget: '$$',
    });

    await expect(
      createRestaurant({
        name: 'Test Restaurant',
        location: 'San Francisco',
        budget: '$$',
      })
    ).rejects.toThrow();
  });

  it('should throw an error when a restaurant with incorrect budget rating is used', async () => {
    await expect(
      createRestaurant({
        name: 'Test Restaurant',
        location: 'San Francisco',
        budget: 'insanely expensive',
      })
    ).rejects.toThrow();
  });
});
