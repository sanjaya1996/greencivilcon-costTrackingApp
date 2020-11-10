import mongoose from 'mongoose';

const laborSchema = mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  payRate: {
    type: Number,
    required: true,
    default: 0.0,
  },
  availability: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
    default: 0.0,
  },
  accountDetails: {
    type: String,
    required: true,
  },
  projectPhase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ProjectPhase',
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  miniPhase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'MiniPhase',
  },
  description: {
    type: String,
    required: true,
  },
});

const Labor = mongoose.model('Labor', laborSchema);

export default Labor;
