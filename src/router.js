import express from 'express';
import { getBooksHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBooksHandler);

export default router;