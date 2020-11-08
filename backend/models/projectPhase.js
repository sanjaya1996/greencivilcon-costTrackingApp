import mongoose from 'mongoose';

const projectPhaseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  estimatedBudget: {
    type: Number,
    required: true,
    default: 0,
  },
  estimatedDate: {
    type: Date,
    required: true,
  },
  startedDate: {
    type: Date,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
});

const ProjectPhase = mongoose.model('ProjectPhase', projectPhaseSchema);

export default ProjectPhase;
