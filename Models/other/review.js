import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);
export default reviewModel;
