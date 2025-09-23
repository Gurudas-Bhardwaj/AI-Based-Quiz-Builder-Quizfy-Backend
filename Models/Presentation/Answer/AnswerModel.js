import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz", required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // this field will be filled depending on quiz type
    selectedOption: {
        type: String
    }, // for poll/ranking (text of the option)
    openText: {
        type: String
    },       // for open-ended

    submittedAt: {
        type: Date,
        default: Date.now
    }
});

export const AnswerModel = mongoose.model("Answer", AnswerSchema);
