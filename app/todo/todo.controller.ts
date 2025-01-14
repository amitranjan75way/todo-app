import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { createResponse } from "../common/helper/response.helper";
import * as todoService from "./todo.service";
import * as userService from "../user/user.service";

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const userId = data.user;
  const isUser = await userService.isUserExist(userId);
  if (!isUser) {
    throw new Error("User not found");
  }

  const todo = await todoService.createTodo(data);
  const Todo = await todoService.addUserToTodo(todo._id, userId);

  res.send(createResponse(Todo, "Todo created successfully"));
});

export const getAllTodos = asyncHandler(async (req: Request, res: Response) => {
  const allTodos = await todoService.getAllTodos();

  res.send(createResponse(allTodos, " all Todos fetched successfully"));
});

export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const isTodo = await todoService.isTodoExist(todoId);
  if (!isTodo) {
    throw new Error("Todo not found");
  }
  const todo = await todoService.getTodoById(todoId);

  res.send(createResponse(todo, "Todo fetched successfully"));
});

export const getTodoByUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const isUser = await userService.isUserExist(userId);
    if (!isUser) {
      throw new Error("User not found");
    }
    const todos = await todoService.getTodoByUser(userId);

    res.send(createResponse(todos, "Todos fetched successfully"));
});

export const updateTodoStatus = asyncHandler(async (req: Request, res: Response) => {
  const todoId = req.params.todo;
  const userId = req.params.userId;
  const status = req.body.status;
  const isTodo = await todoService.isTodoExist(todoId);
  if (!isTodo) {
    throw new Error("Todo not found");
  }
  const isUser = await userService.isUserExist(userId);
  if (!isUser) {
    throw new Error("User not found");
  }
  const isTodoBelongsToUser = await todoService.todoBelongsToUser(todoId, userId);
  if (!isTodoBelongsToUser) {
    throw new Error("Todo does not belong to user");
  }
  const updatedTodo = await todoService.updateTodoStatus(todoId, status);

  res.send(createResponse(updatedTodo, "Todo status updated successfully"));
});
