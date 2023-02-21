import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  email: { type: String },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

export default mongoose.model('User', UserSchema);
