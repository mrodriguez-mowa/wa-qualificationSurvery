import mongoose from "mongoose";

const connectMongo = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/incoming")
  } catch (e) {
    console.log("ERROR Connecting MongoDB")
  }
} 

connectMongo()