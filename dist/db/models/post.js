import * as mongoose from 'mongoose';
const { Schema } = mongoose;
const PostSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    content: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
export default mongoose.model('Post', PostSchema);
