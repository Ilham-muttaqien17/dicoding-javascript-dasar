const { nanoid } = require('nanoid');
const books = require('./books');

const addNewBook = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = res
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = res
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

    return response;
  }

  let finished = false;
  if (readPage === pageCount) {
    finished = true;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = res
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);

    return response;
  }

  const response = res
    .response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    })
    .code(500);

  return response;
};

const getAllBooks = (req, res) => {
  const { name, reading, finished } = req.query;

  if (Object.keys(req.query).length !== 0) {
    let findBook = [];

    if (typeof name !== 'undefined') {
      books.forEach((book) => {
        const regex = new RegExp(`${name}`, 'gi');
        if (regex.test(book.name)) {
          findBook.push(book);
        }
      });
    }

    if (typeof reading !== 'undefined') {
      let isReading = false;

      if (reading > 0) isReading = true;

      if (findBook.length !== 0) {
        findBook = findBook.filter((book) => book.reading === isReading);
      } else {
        findBook = books.filter((book) => book.reading === isReading);
      }
    }

    if (typeof finished !== 'undefined') {
      let isFinished = false;

      if (finished > 0) isFinished = true;

      if (findBook.length !== 0) {
        findBook = findBook.filter((book) => book.finished === isFinished);
      } else {
        findBook = books.filter((book) => book.finished === isFinished);
      }
    }

    const response = res
      .response({
        status: 'success',
        data: {
          books: findBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return response;
  }

  const allBooks = [];
  books.forEach((book) => {
    allBooks.push({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    });
  });

  const response = res
    .response({
      status: 'success',
      data: {
        books: allBooks,
      },
    })
    .code(200);

  return response;
};

const getBookById = (req, res) => {
  const { bookId } = req.params;

  const result = books.filter((book) => book.id === bookId)[0];

  if (result) {
    const response = res
      .response({
        status: 'success',
        data: {
          book: result,
        },
      })
      .code(200);

    return response;
  }

  const response = res
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);

  return response;
};

const updateBook = (req, res) => {
  const { bookId } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = res
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = res
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

    return response;
  }

  let finished = false;
  if (readPage === pageCount) {
    finished = true;
  }

  const index = books.findIndex((book) => book.id === bookId);

  const updatedAt = new Date().toISOString();

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = res
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);

    return response;
  }

  const response = res
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);

  return response;
};

const deleteBook = (req, res) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const response = res
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);

    return response;
  }

  const response = res
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);

  return response;
};

module.exports = {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
