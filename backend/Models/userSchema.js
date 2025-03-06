import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  }, 
  fullName: {
    type: String,
    required: true,
  },  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },  
  role: { type: String, enum: ['customer', 'farmer', 'admin'], required: true }
});


const User = mongoose.model("User", userSchema);

export default User;