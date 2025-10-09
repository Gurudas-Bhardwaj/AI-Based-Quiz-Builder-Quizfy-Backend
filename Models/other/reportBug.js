import mongoose from "mongoose";


const reportBugSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel",
        required : true,
    },
    details : {
        type : String,
        required : true,
    },
    createdOn : {
        type : Date, 
        default : Date.now,
    },
})

const reportBugModel = mongoose.model("reportBugModel", reportBugSchema);
export default reportBugModel;