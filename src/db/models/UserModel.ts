import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String },
  password: { type: String },
  name: { type: String },
  email: { type: String },
  role: { type: String },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      }
      bcrypt.hash(user.password, salt, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

export default mongoose.model('User', UserSchema);
