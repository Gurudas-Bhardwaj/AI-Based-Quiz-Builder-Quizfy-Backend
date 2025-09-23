import mongoose from "mongoose";

export async function connection(url) {
    return mongoose.connect(url);
}