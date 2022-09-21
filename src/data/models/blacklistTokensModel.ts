import mongoose from "../connector/mongo"

const blacklistTokensSchema = new mongoose.Schema({
    jwt:{  type: String , required: true }
});

export default mongoose.model("Blacklist", blacklistTokensSchema);
