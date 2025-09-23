import mongoose from "mongoose"

const presentationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    isLive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const presentationModel = mongoose.model("Presentation",presentationSchema)