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
    addedAdmin : {
        type : [
            {
                userId : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "userModel",
                    required : true,
                },
                userName : {
                    type : String, 
                    default : "User",
                    required : true,
                }, 
                userGmail : {
                    type : String, 
                    required : true,
                }, 
                createdAt : {
                    type : Date, 
                    default : Date.now
                }
            }
        ], 
    default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const presentationModel = mongoose.model("Presentation",presentationSchema)