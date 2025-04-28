import Board, {IBoard} from "../models/boardModel";

class BoardService {
    // Create a new board
    async createBoard(title: string, description: string, userID: string): Promise<IBoard> {
        const newBoard = Board.create({
            title,
            description,
            createdBy: userID,
        });
        return newBoard;
    }

    // get all boards for a user
    async getAllBoards(userID: string): Promise<IBoard[]>{
        const boards: IBoard[] = await Board.find({createdBy: userID});
        return boards;
    }

    // get a single board by ID
    async getBoardById (boardId: string, userId: string) : Promise <IBoard | null> {
        return Board.findOne({_id: boardId, createdBy: userId});
    }

    // update a board by ID
    async updateBoard (boardId:string, userId: string, updateInfo: Object) : Promise<IBoard | null> {
        const updatedBoard = await Board.findOneAndUpdate({_id: boardId, createdBy: userId}, updateInfo, {new: true});
        return updatedBoard;
    }

    // delete a board by ID
    async deletBoard (boardId: string, userId: string) : Promise<IBoard | null> {
        const deletedBoard = await Board.findOneAndDelete({_id: boardId, createdBy: userId});
        return deletedBoard;
    }
}

const boardService = new BoardService();
export default boardService;
