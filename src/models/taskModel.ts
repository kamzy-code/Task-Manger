import mongoose, {Document, Schema} from "mongoose";

export interface ITask extends Document{
    title: string;
    description?: string;
    dueDate?: Date;
    position: number;
    listId: mongoose.Types.ObjectId;
    boardId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
    title: {type: String, required: true},
    description: {type: String},
    dueDate: {type: Date},
    position: {type: Number, default: 0},
    listId: {type: mongoose.Schema.Types.ObjectId, ref: "List", required: true},
    boardId: {type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {
    timestamps: true
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
