import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.PORT || 3000),
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-development',
    clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};