import * as mongoose from 'mongoose';
const { Schema } = mongoose;
const SessionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String },
    token: { type: String },
    started_at: { type: Date },
    expires_at: { type: Date },
});
export default mongoose.model('Session', SessionSchema);
