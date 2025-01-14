import mongoose from "mongoose";

export const initDb = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            reject(new Error("MONGO_URI is not set"));
            return;
        }
        mongoose
            .connect(uri)
            .then(() => {
                console.log("DB Connected!");
                resolve(true);
            })
            .catch(reject);
    })
}