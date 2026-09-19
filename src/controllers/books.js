import {
  getAllBooks,
  getBookById,
  authorExists,
  createBook,
  updateBook,
  deleteBook
} from '../models/books.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);

  } catch (error) {
    console.error('GET /books failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);

  } catch (error) {
    console.error('GET /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const createBookHandler = async (req, res) => {
  try {
    const {
      id,
      authorId,
      title,
      publicationDate
    } = req.body;

    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'Missing required book fields.'
      });
    }

    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'Book id already exists.'
      });
    }

    const existingAuthor = await authorExists(authorId);

    if (!existingAuthor) {
      return res.status(400).json({
        message: 'Author not found.'
      });
    }

    const createdBook = await createBook({
      id,
      authorId,
      title,
      publicationDate
    });

    return res.status(201).json(createdBook);

  } catch (error) {
    console.error('POST /books failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      authorId,
      title,
      publicationDate
    } = req.body;

    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'Missing required book fields.'
      });
    }

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    const existingAuthor = await authorExists(authorId);

    if (!existingAuthor) {
      return res.status(400).json({
        message: 'Author not found.'
      });
    }

    const updatedBook = await updateBook(id, {
      authorId,
      title,
      publicationDate
    });

    return res.status(200).json(updatedBook);

  } catch (error) {
    console.error('PUT /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    await deleteBook(id);

    return res.status(204).send();

  } catch (error) {
    console.error('DELETE /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};