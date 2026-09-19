import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
  const db = await getDb();

  const collection = db.collection('authors');

  const authors = await collection.find({}).toArray();

  return authors;
};

const getAuthorById = async (id) => {
  const db = getDb();

  const collection = db.collection('authors');

  const author = await collection.findOne({ id });

  return author;
};

const createAuthor = async (author) => {
  const db = getDb();

  const collection = db.collection('authors');

  await collection.insertOne(author);

  return author;
};

const updateAuthor = async (id, author) => {
  const db = getDb();

  const collection = db.collection('authors');

  await collection.updateOne(
    { id },
    { $set: author }
  );

  return { id, ...author };
};

const deleteAuthor = async (id) => {
  const db = getDb();

  const collection = db.collection('authors');

  const result = await collection.deleteOne({ id });

  return result;
};

const authorHasBooks = async (id) => {
  const db = getDb();

  const collection = db.collection('books');

  const count = await collection.countDocuments({ authorId: id });

  return count > 0;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};