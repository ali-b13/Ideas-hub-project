import mongoose, { models, model, Schema } from "mongoose";
const prompt = new Schema({
	creator: {
		type: mongoose.Types.ObjectId,
    ref:"User"
	},
	prompt: { type: String },
  tag:{type:String},
	createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Prompt=models.Prompt || model("Prompt",prompt);
export default Prompt