import { getAllBooks, getBookById } from '../models/books.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);

  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { getBooksHandler, getBookByIdHandler };