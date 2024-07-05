import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productStatusSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'cancel', 'success', 'return'],
    default: 'pending',
    required: true
  },
  currentLocation: {
    city: {
        type: String,  
        trim: true
    },
    state: {
        type: String,  
        trim: true
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProductStatus', productStatusSchema);
