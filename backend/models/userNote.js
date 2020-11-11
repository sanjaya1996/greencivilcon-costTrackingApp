import mongoose from 'mongoose';

const userNoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      uri: {
        type: String,
      },
    },
  ],
  pickedDateTime: {
    type: Date,
  },
  notificationId: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const UserNote = mongoose.model('UserNote', userNoteSchema);

export default UserNote;
