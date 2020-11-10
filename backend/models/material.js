import mongoose from 'mongoose';

const materialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantityUsed: {
    type: Number,
    required: true,
    default: 0,
  },
  rate: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0.0,
  },
  miniPhase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'MiniPhase',
  },
  projectPhase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ProjectPhase',
  },
});

const Material = mongoose.model('Material', materialSchema);

export default Material;
