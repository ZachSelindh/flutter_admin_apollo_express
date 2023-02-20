import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    email: { type: String },
    posts: { type: Array }
  });

export default mongoose.model('User', UserSchema);
