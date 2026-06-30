import { config } from "dotenv";

config()

export const envs = {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI,
}