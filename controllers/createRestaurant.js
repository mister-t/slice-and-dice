import Restaurant from '../models/restaurantModel.js';

export async function createRestaurant({ name, location, budget }) {
  try {
    const existsRestaurant = await Restaurant.findOne({ name });

    if (existsRestaurant)
      throw new Error(`A restaurant with the name, ${name}, already exists.`);

    const newRestaurant = new Restaurant({ name, location, budget });

    await newRestaurant.save();

    return {
      restaurantId: newRestaurant._id,
    };
  } catch (err) {
    throw new Error(`Unable to create new restaurant: ${err.message}`);
  }
}
