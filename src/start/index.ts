
import { connectDb } from "../database";
import { createApp } from "./app";

export const start = async () => {
  await connectDb();
  createApp();
};