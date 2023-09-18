const addButton = document.getElementById("button");
const veil = document.getElementById("veil");

addButton.addEventListener("click", function (event) {
  event.preventDefault();
  veil.style.display = "flex";
});

const bookTitleInput = document.getElementById("book-title");
const authorInput = document.getElementById("author-name");
const pagesInput = document.getElementById("number-pages");
const readCheckbox = document.getElementById("read?");

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = isRead;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const myLibrary = [];

function addBookToLibrary() {
  const title = bookTitleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const isRead = readCheckbox.checked;

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  bookTitleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readCheckbox.checked = false;

  printBook(newBook);
}

const cardContainer = document.getElementById("card-container");

function printBook(book) {
  const createCard = document.createElement("div");
  createCard.classList.add("card");

  const cardTextStyle = document.createElement("div");
  cardTextStyle.classList.add("card-text");

  const titleP = document.createElement("p");
  titleP.textContent = book.title;

  const authorP = document.createElement("p");
  authorP.textContent = `Author: ${book.author}`;

  const pagesP = document.createElement("p");
  pagesP.textContent = `Pages: ${book.pages}`;

  const readButton = document.createElement("button");
  readButton.classList.add("read-button")
  readButton.textContent = book.read ? "Read" : "Not Read";
  readButton.addEventListener("click", function () {
    book.toggleRead();
    readButton.textContent = book.read ? "Read" : "Not Read";
  });

  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-button"
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    const bookIndex = myLibrary.indexOf(book);
    if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
      cardContainer.removeChild(createCard);
    }
  });

  cardContainer.appendChild(createCard);
  createCard.appendChild(cardTextStyle);
  cardTextStyle.appendChild(titleP);
  cardTextStyle.appendChild(authorP);
  cardTextStyle.appendChild(pagesP);
  cardTextStyle.appendChild(readButton);
  cardTextStyle.appendChild(deleteButton);
}

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  addBookToLibrary();
  veil.style.display = "none";
})