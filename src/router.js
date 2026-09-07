import express from 'express';
import { getBooksHandler, getBookByIdHandler  } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);

export default router;