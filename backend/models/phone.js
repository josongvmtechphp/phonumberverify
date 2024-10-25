/**
 * Phone number verification collection schema
 */
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    default: '',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const result = mongoose.model('phoneNumbers', schema);

export default result;
