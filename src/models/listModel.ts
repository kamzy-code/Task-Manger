import { create } from "domain";
import mongoose, {Document, Schema} from "mongoose";

export interface Ilist extends Document{
    title: string;
    position: number;
    boardId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
}

const listSchema = new Schema(
    {
        title: {type: String, required: true},
        position: {type: Number, required: true},
        boardId: {type: mongoose.Types.ObjectId, ref: "Board", required: true},
        createdBy: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    },
    {timestamps: true}
);

export const List = mongoose.model<Ilist>("List", listSchema);