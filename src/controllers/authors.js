import {
  getAllAuthors as getAllAuthorsFromDb,
  getAuthorById as getAuthorByIdFromDb,
  createAuthor as createAuthorFromDb,
  updateAuthor as updateAuthorFromDb,
  deleteAuthor as deleteAuthorFromDb,
  authorHasBooks
} from '../models/authors.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();
    return res.status(200).json(authors);

  } catch (error) {
    return res.status(500).json({
      message: 'Unable to retrieve authors.'
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await getAuthorByIdFromDb(id);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found.'
      });
    }

    return res.status(200).json(author);

  } catch (error) {
    return res.status(500).json({
      message: 'Unable to retrieve author.'
    });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { id, name, birthDate, biography } = req.body;

    if (!id || !name || !birthDate || !biography) {
      return res.status(400).json({
        message: 'Missing required author fields.'
      });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);

    if (existingAuthor) {
      return res.status(400).json({
        message: 'Author id already exists.'
      });
    }

    const createdAuthor = await createAuthorFromDb({
      id,
      name,
      birthDate,
      biography
    });

    return res.status(201).json(createdAuthor);

  } catch (error) {
    return res.status(500).json({
      message: 'Unable to create author.'
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthDate, biography } = req.body;

    if (!name || !birthDate || !biography) {
      return res.status(400).json({
        message: 'Missing required author fields.'
      });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found.'
      });
    }

    const updatedAuthor = await updateAuthorFromDb(id, {
      name,
      birthDate,
      biography
    });

    return res.status(200).json(updatedAuthor);

  } catch (error) {
    return res.status(500).json({
      message: 'Unable to update author.'
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAuthor = await getAuthorByIdFromDb(id);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found.'
      });
    }

    if (await authorHasBooks(id)) {
      return res.status(400).json({
        message: 'Author cannot be deleted because books reference this author.'
      });
    }

    await deleteAuthorFromDb(id);

    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({
      message: 'Unable to delete author.'
    });
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};