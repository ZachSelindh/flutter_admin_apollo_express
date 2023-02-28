import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const SessionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  token: { type: String },
  started_at: { type: Date },
  expires_at: { type: Date },
});

export default mongoose.model('Session', SessionSchema);
