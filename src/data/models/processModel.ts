import mongoose from "../connector/mongo";

const processSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: {
    type: String,
    required: true,
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Frisbee",
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  steps: [
    {
      nbStep: { type: Number, required: true },
      descStep: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Process", processSchema);
