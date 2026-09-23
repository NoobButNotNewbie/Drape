import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({
    path: fileURLToPath(new URL('../../../../.env', import.meta.url)),
});

const requiredEnv = ['JWT_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

export const env = {
    port: Number(process.env.PORT || 3000),
    jwtSecret: process.env.JWT_SECRET,
    clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};