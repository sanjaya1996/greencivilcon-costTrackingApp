import mongoose from 'mongoose';

const miscellanySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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

const Miscellany = mongoose.model('Miscellany', miscellanySchema);

export default Miscellany;
