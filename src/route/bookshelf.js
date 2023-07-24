const {
  simpanBuku,
  nampilinBuku,
  getDetailBook,
  editBook,
  deleteBook,
  getFinishedBooks,
} = require("../handler/handlerBookshelf");

const bookshelf = [
  {
    method: "POST",
    path: "/books",
    handler: simpanBuku,
  },
  {
    method: "GET",
    path: "/books",
    handler: nampilinBuku,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getDetailBook,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
  },
];

module.exports = bookshelf;
