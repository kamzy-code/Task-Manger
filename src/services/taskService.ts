import { Task, ITask } from "../models/taskModel";

class TaskService {
    async createTask(title:string, description:string, dueDate:Date, position:number, listId:string, boardId:string, userID:string): Promise<ITask> {
        const task = new Task({
            title,
            description,
            dueDate,
            position: position ?? 0,
            listId,
            boardId,
            createdBy: userID
        });
        return await task.save();
    }

    async getTasksByList (listId:string, userID: string): Promise<ITask[]>{
        return await Task.find({listId, createdBy: userID}).sort({position: 1});
    }

    async getTaskById (taskId:string, userID: string): Promise<ITask | null> {
        return await Task.findOne({_id: taskId, createdBy: userID});
    }

    async updateTask (taskId: string, data: Partial<ITask>, userId: string): Promise<ITask | null> {
        return await Task.findOneAndUpdate({_id: taskId, createdBy: userId}, data, {new: true});
    }

    async moveTask (taskId: string, newPosition: number, newListId: string, userId: string): Promise<ITask | null> {
        return await Task.findOneAndUpdate({_id: taskId, createdBy: userId}, {position: newPosition, listId: newListId}, {new: true});
    }

    async deleteTask (taskId: string, userId: string): Promise<ITask | null> {
        return await Task.findOneAndDelete({_id: taskId, createdBy: userId});
    }

}

export const taskService = new TaskService();
