import { body } from 'express-validator';

export const createTodo = [
    body('title').notEmpty().withMessage('title is required').isString().withMessage('title must be a string'),
    body('description').notEmpty().withMessage('description is required').isString().withMessage('description must be a string'),
    body('user').notEmpty().withMessage('userId is required').isString().withMessage('userId must be a string'),
];

export const updateTodoStatus = [
    body('status').notEmpty().withMessage('status is required').isString().withMessage('status must be a string').isIn(['COMPLETE', 'INCOMPLETE']).withMessage('status must be either COMPLETE or INCOMPLETE'),
];