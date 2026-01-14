import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    youtubeUrl: { type: String },
    practiceUrl: { type: String },
    articleUrl: { type: String },
    level: {
      type: String,
      enum: ['Easy', 'Medium', 'Tough'],
      default: 'Easy',
    },
  },
  { timestamps: true }
);

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    chapter: { type: String, required: true },
    problems: [problemSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Topic', topicSchema);

