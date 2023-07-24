const { nanoid } = require("nanoid");
const bookshelfData = require("../books/bookshelfData");

const simpanBuku = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);

  let finished = false;
  if (readPage === pageCount) {
    finished = true;
  }

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
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  bookshelfData.push(newBook);

  if (!name) {
    const errorResponse = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
    return errorResponse;
  }

  if (readPage > pageCount) {
    const errorResponse = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return errorResponse;
  }

  const response = h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    })
    .code(201);
  return response;
};

const nampilinBuku = (request, h) => ({
  status: "success",
  data: {
    bookshelfData,
  },
});

const getDetailBook = (request, h) => {
  const { bookId } = request.params;

  const book = bookshelfData.find((b) => b.id === bookId);

  if (!book) {
    const errorResponse = h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
    return errorResponse;
  }

  const response = h
    .response({
      status: "success",
      data: { book },
    })
    .code(200);
  return response;
};

const editBook = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const book = bookshelfData.find((b) => b.id === bookId);

  if (!name) {
    const errorResponse = h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku.",
      })
      .code(400);
    return errorResponse;
  }

  if (readPage > pageCount) {
    const errorResponse = h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount.",
      })
      .code(400);
    return errorResponse;
  }

  // Implement logic to update the book data in bookshelfData (not shown in the provided code).

  const response = h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui.",
    })
    .code(200);
  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = bookshelfData.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    bookshelfData.splice(bookIndex, 1);
    const successResponse = h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
    return successResponse;
  }

  const failedResponse = h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
  return failedResponse;
};

module.exports = {
  simpanBuku,
  nampilinBuku,
  getDetailBook,
  editBook,
  deleteBook,
};
