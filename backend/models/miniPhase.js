import mongoose from 'mongoose';

const miniPhaseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  projectPhase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ProjectPhase',
  },
});

const MiniPhase = mongoose.model('MiniPhase', miniPhaseSchema);

export default MiniPhase;
