import { type ITodo } from "./todo.dto";
import todoSchema from "./todo.schema";

export const createTodo = async(data: ITodo) => {
    const todo = new todoSchema(data);
    return await todo.save();
}
export const addUserToTodo = async(todoId: string, userId: string) => {
    return await todoSchema.findByIdAndUpdate(todoId, { user: userId }, { new: true });
}

export const isTodoExist = async(todoId: string): Promise<boolean> => {
    const todo = await todoSchema.findById(todoId);
    if(todo){
        return true;
    }else{
        return false;
    }
}

export const getTodoByUser = async(userId: string) => {
    return await todoSchema.find({ user: userId });
}

export const getTodoById = async(todoId: string) => {
    return await todoSchema.findById(todoId).populate('user', 'name email status');
}

export const getAllTodos = async() => {
    return await todoSchema.find().populate('user', 'name email status');
}

export const updateTodoStatus = async(todoId: string, status: string) => {
    return await todoSchema.findByIdAndUpdate(todoId, { status: status }, { new: true });
}

export const todoBelongsToUser = async(todoId: string, userId: string): Promise<boolean> => {
    const todo = await todoSchema.findOne({ _id: todoId, user: userId });
    if(todo){
        return true;
    }else{
        return false;
    }   
}

