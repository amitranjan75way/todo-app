import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.helper";
import jwt from "jsonwebtoken";
import { IUser } from "./user.dto";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    let user = await userService.createUser(data);
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const jwtSecret: string = process.env.JWT_SECRET as string;
    
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "3d"
    });

    (user as any).token=token;

    console.log(token);
    const options: any = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'None',
        secure: true
    };
    res.cookie("token", token, options).status(200).json(
        {
            success: true,
            token: token,
            user: user,
            message: "User Registered successfully"
        }
    );
});