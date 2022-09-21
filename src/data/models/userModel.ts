import mongoose from "../connector/mongo"
import isEmail from "validator/lib/isEmail"

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { 
    type: String, 
    required: true 
  },
  mail: {
    type: String,
    unique: true,
    validate: [ isEmail, 'Invalid email' ],
    required: true
  },
  roles: [{
    type: String,
    enum: ["admin", "operator"],
    required:true
  }]
});

export default mongoose.model("User", userSchema);
