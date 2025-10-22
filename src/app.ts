import express from 'express';
import helmet from 'helmet';
import stringRoutes from './routes/string.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(express.json());

// Routes

app.get('/', (_, res) => {
  res.send(' String Analyzer API is running...');
});

app.use('/strings', stringRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// Global error handler
app.use(errorHandler);

// listen function moved to server.ts
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;
