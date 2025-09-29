import mongoose from "mongoose"


const questionSchema = new mongoose.Schema({
    presentation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Presentation", required: true
    },
    designType: {
        type: String,
        required: true,
    },
    designTemplate: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [
            {
                text: { type: String, default : "" },
                color: { type: String, default: "#000000" }, 
                votes: { type: Number, default: 0 },
                answer : {type : Boolean, default : false},
            }
        ],
        default: undefined,
    },
    isLive: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    order: {
        type: Number,
        required: true
    }
})

export const questionModel = mongoose.model("Question", questionSchema);