import mongoose from "mongoose";

const QuestionResponseSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  questionIndex: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: false, // allow anonymous
  },
  optionId: {
    type: String,
    default: null,
  },
  textAnswer: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("QuestionResponse", QuestionResponseSchema);
