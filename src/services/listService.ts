import { List, Ilist } from "../models/listModel";

class ListService{
    async createList(title: string, position: number, boardId: string, userID: string): Promise<Ilist>{
        const list = await List.create({
            title,
            position,
            boardId,
            createdBy: userID
        });
        return list;
    }   
    
    async getListsByBoard (boardID: string, userID: string) : Promise<Ilist[]> {
        const lists = await List.find({boardID, createdBy: userID}).sort({position: 1}); 
        return lists;
    }

    async getListById (listID: string, userID: string) : Promise <Ilist | null>{
        const list = await List.findOne({_id: listID, createdBy: userID});
        return list;
    }

    async updateList (listID: string, data: Partial<Ilist>, userID: string) : Promise<Ilist | null> {
        const list = await List.findOneAndUpdate({_id: listID, createdBy: userID}, data, {new: true});
        return list;
    }

    async deleteList (listID: string, userID: string) : Promise<Ilist | null> {
        const list = await List.findOneAndDelete({_id: listID, createdBy: userID});
        return list;
    }
}

export const listService = new ListService();