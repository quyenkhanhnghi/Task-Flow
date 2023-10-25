import express from 'express';
import { boardRouter } from './routes/boardRouter';
import { allowedOrigins, credentials } from './utils/credentials';
import cors from 'cors';

const app = express();
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins, // Use the allowedOrigins array directly
  optionsSuccessStatus: 200,
};
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use('/boards', boardRouter);

export { app };
