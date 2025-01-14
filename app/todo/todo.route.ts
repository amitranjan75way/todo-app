import express from "express";
const router = express.Router();
import * as todoController from "./todo.controller";
import * as todoValidation from "./todo.validation";
import {auth, isAdmin, isUser} from "../common/middleware/auth.middleware";

router
  .post("/", todoValidation.createTodo, todoController.createTodo)
  .get("/", todoController.getAllTodos)
  .get("/:id", todoController.getTodoById)
  .get("/user/:userId", todoController.getTodoByUser)
  .post("/status/:todo/:userId", todoValidation.updateTodoStatus, todoController.updateTodoStatus);

export default router;
