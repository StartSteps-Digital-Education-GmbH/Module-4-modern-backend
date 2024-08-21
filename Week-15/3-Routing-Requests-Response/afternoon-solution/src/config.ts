import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 4000;

export const customMessage = process.env.CUSTOM_MESSAGE || 'Default message';