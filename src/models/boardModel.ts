import mongoose, { Document, Schema } from "mongoose";

export interface IBoard extends Document {
    title: string;
    description?: string;
    createdBy: mongoose.Types.ObjectId;
}

const boardSchema = new Schema<IBoard>(
    {
        title: {type: String, required: true},
        description: {type: String, required: false},
        createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    },
    {timestamps: true}
); 

const Board = mongoose.model<IBoard>("Board", boardSchema);
export default Board;