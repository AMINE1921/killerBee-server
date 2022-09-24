import mongoose from "../connector/mongo";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Ingredient", ingredientSchema);
