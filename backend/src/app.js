import cors from 'cors';
import express from 'express';
import { env } from './common/config/env.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import authRoutes from './modules/auth/auth.routes.js';
import productRoutes from './modules/catalog/product.routes.js';
import cartRoutes from './modules/cart/cart.routes.js';
import orderRoutes from './modules/order/order.routes.js';
import paymentRoutes from './modules/payment/payment.routes.js';
import wardrobeRoutes from './modules/wardrobe/wardrobe.routes.js';
import outfitRoutes from './modules/feed/outfit.routes.js';
import searchRoutes from './modules/search/search.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';

const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/wardrobe', wardrobeRoutes);
app.use('/api/outfits', outfitRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
