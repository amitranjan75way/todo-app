import { type IUser } from "./user.dto";
import userSchema from "./user.schema";

export const createUser = async(data: IUser) => {
    const user = new userSchema(data);
    return await user.save();
}

export const addTodoToUser = async(userId: string, todoId: string) => {
    const user = await userSchema.findByIdAndUpdate(userId, { $push: { todos: todoId } }, { new: true });
    if (user) {
        user.password = '';
    }
    return user;
}

export const isUserExist = async (userId: string): Promise<boolean> => {
    const user = await userSchema.findById(userId);
    if(user){
        return true;
    }else{
        return false;
    }
};