import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import path from 'path';
import dashboardRoutes from './router/dashboardRoutes';
import expenseRoutes from './router/expenseRoutes';
import productRoutes from './router/productRoutes';
import userRoutes from './router/userRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Middleware to serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/dashboard', dashboardRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

const port = Number(process.env.PORT) || 3001;
app.listen(port, '0.0.0.0', () =>
  console.log(`Server started on port ${port}.`),
);
