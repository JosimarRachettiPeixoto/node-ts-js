import  express from 'express';

import { errorHandler } from './error/error-handler.js';
import fileRoutes from './routes/files.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileRoutes);
app.use(userRoutes);
app.use(errorHandler);
console.log("server run, port: 3000");
app.listen(3000);