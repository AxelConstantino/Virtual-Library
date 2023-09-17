const addButton = document.getElementById("button")
const veil = document.getElementById("veil")
//muestra el formulario haciendo click en el boton add
addButton.addEventListener("click", function(event) {
    event.preventDefault();
    veil.style.display = "flex";
})

const bookTitleInput = document.getElementById("book-title");
const authorInput = document.getElementById("author-name");
const pagesInput = document.getElementById("number-pages");
const readCheckbox = document.getElementById("read?");

const myLibrary = []

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    const title = bookTitleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const isRead = readCheckbox.checked;

    const newBook = new Book(title, author, pages, isRead)
    myLibrary.push(newBook)

    bookTitleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readCheckbox.checked = false;
}


const cardContainer = document.getElementById("card-container") 
function printBook(Book, index) {
    const createCard = document.createElement("div")
    createCard.classList.add("card")

    const cardTextStyle = document.createElement("div")
    cardTextStyle.classList.add("card-text")

    const titleP = document.createElement("p")
    titleP.textContent = Book.title

    const authorP = document.createElement("p")
    authorP.textContent = `Author: ${Book.author}`

    const pagesP = document.createElement("p")
    pagesP.textContent = `Pages: ${Book.pages}`

    const deleteButton = document.createElement("button")
    deleteButton.id = "delete-button"
    deleteButton.textContent = "Delete"

    deleteButton.dataset.index = index;
    
    deleteButton.addEventListener("click", function() {
        const bookIndex = this.dataset.index;
        // Elimina el libro del array myLibrary usando el índice
        myLibrary.splice(index, 1);
        // Elimina la tarjeta del DOM
        cardContainer.removeChild(createCard);
    });

    cardContainer.appendChild(createCard);
    createCard.appendChild(cardTextStyle)
    cardTextStyle.appendChild(titleP)
    cardTextStyle.appendChild(authorP)
    cardTextStyle.appendChild(pagesP)
    cardTextStyle.appendChild(deleteButton)
}


const submitButton = document.getElementById("submit-button")
submitButton.addEventListener("click", function(event){
    event.preventDefault();
    addBookToLibrary();
    veil.style.display = "none"
    
    const lastBook = myLibrary[myLibrary.length - 1];
    printBook(lastBook);
})