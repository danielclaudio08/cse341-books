import { getDb } from '../db/connect.js';

const getAllBooks = async () => {

  const db = await getDb();

  const collection = db.collection('books');

  const books = await collection.find({}).toArray();

  return books;

};

const getBookById = async (bookId) => {

  const db = await getDb();

  const collection = db.collection('books');

  const book = await collection.findOne({ id: bookId });

  return book;

};

const authorExists = async (authorId) => {

  const db = await getDb();

  const collection = db.collection('authors');

  const author = await collection.findOne({ id: authorId });

  return !!author;

};

const createBook = async (book) => {

  const db = await getDb();

  const collection = db.collection('books');

  await collection.insertOne(book);

  return book;

};

const updateBook = async (bookId, book) => {

  const db = await getDb();

  const collection = db.collection('books');

  await collection.updateOne(

    { id: bookId },

    { $set: book }

  );

  return { id: bookId, ...book };

};

const deleteBook = async (bookId) => {

  const db = await getDb();

  const collection = db.collection('books');

  const result = await collection.deleteOne({ id: bookId });

  return result;

};

export {
  getAllBooks,
  getBookById,
  authorExists,
  createBook,
  updateBook,
  deleteBook
};