import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};
