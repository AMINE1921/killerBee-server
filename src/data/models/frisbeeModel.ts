import mongoose from "../connector/mongo";

const frisbeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  range: { type: String, required: false },
  ingredients: [
    {
      weight: { type: Number, required: true },
      ingredientId: {
        type: mongoose.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
    },
  ],
});

export default mongoose.model("Frisbee", frisbeeSchema);
