import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presentation",
    required: true,
  },
  // adminId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "userModel",
  //   required: true,
  // },
  status: {
    type: String,
    enum: ["live", "paused", "ended"],
    default: "live",
  },
  currentQuestion: {
    type: Number,
    default: 0,
  },
  // keep only aggregated counts here
  results: {
    type: Object,
    default: {}, // { "0": { "option1": 5, "option2": 2 }, "1": { ... } }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Session", SessionSchema);
