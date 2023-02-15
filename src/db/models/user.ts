import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    name: { type: String },
    email: { type: String },
  });

mongoose.model('user', UserSchema);
