import dotenv from 'dotenv';

dotenv.config();

export const TOKEN = process.env.TOKEN || '';
export const APPLICATION_ID = process.env.APPLICATION_ID || '';
export const GUILD_ID = process.env.GUILD_ID || '';
export const TENOR_API_KEY = process.env.TENOR_API_KEY || '';
export const DB_USER = process.env.DB_USER || false;
export const DB_PASS = process.env.DB_PASS || false;
export const DEV = process.env.DEV || false;
export const DB_LOCAL_URI = process.env.DB_LOCAL_URI || false;
export const DB_REMOTE_URI = process.env.DB_REMOTE_URI || false;
export const ANNOUNCEMENT_CHANNEL_ID = process.env.ANNOUNCEMENT_CHANNEL_ID || '';
export const SERVER_MANAGER_CHANNEL_ID = process.env.SERVER_MANAGER_CHANNEL_ID || '';
export const BULLETIN_CHANNEL_ID = process.env.BULLETIN_CHANNEL_ID || '';
export const BULLETIN_MESSAGE_ID = process.env.BULLETIN_MESSAGE_ID || '';