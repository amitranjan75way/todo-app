import { type BaseSchema } from "../common/dto/base.dto";

export interface ITodo extends BaseSchema {
    title: string;
    description: string;
    status: "INCOMPLETE" | "COMPLETE";
    user?: string;
}