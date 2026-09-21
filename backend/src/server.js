import app from './app.js';
import { env } from './common/config/env.js';
import { connectDatabase } from './common/config/db.js';

await connectDatabase();

app.listen(env.port, () => {
  console.log(`Drape API listening on port ${env.port}`);
});
