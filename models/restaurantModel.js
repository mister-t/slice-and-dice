import mongoose from 'mongoose';

//Replace with any schema you see fit
const restaurantSchema = mongoose.Schema({
  name: String,
  location: String,
  budget: {
    type: String,
    enum: ['$', '$$', '$$$'],
    default: '$',
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
