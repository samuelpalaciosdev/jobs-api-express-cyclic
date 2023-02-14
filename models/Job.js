const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name must be provided'],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, 'Position must be provided'],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ['inteview', 'declined', 'pending'],
      default: 'pending',
    },
    // Associating the job with the user that creates it
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must be provided'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
