import mongoose from 'mongoose';

//Current Project
const projectSchema = mongoose.Schema({
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Supervisor',
  },
  title: { type: String, required: true },
  address: { type: String, required: true },
  startedDate: { type: Date, required: true },
  estimatedDate: { type: Date, required: true },
  estimatedBudget: { type: Number, required: true, default: 0 },
});

const Project = mongoose.model('Project', projectSchema);

// History Project
const historyProjectSchema = mongoose.Schema({
  finishedProject: projectSchema,
});

const HistoryProject = mongoose.model('HistoryProject', historyProjectSchema);

export { Project, HistoryProject };
