import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    FullName:{
      type:String,
    },
    Username: {
      type: String,
    },
    Email: {
      type: String,
      // sparse: true,
    },
    Password: {
      type: String,
    },
     Role:{
     type:String
    },
    Name: {
      type: String,
    },
    Image: {
      type: String,
    },
    Provider: {
      type: String, // 'credentials' or 'google'
    },
    Country:{
      type:String
    },
    City:{
      type:String
    },
    totalLinks:{
      type:Number,
      default:0
    },
    isPremium:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const Data = mongoose.models.loggedUsers || mongoose.model("loggedUsers", UserSchema);

export default Data;
