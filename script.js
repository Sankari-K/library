let bookContainer = document.querySelector('.book-container')

// All book objects are stored in an array
let myLibrary = [];

// Object constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = parseInt(pages);
    this.isRead = isRead;
    let isReadInWords = this.isRead ? "read":"not read yet";
    this.getInfo =  () => `${this.title} by ${this.author}, \
        ${this.pages} pages, ` + isReadInWords;
}

// Adding a book through user input
function addBookToLibrary() {
    let newBook = getUserInput();
    const newBookObject = new Book(...newBook);
    myLibrary.push(newBookObject);
    displayBook(newBookObject);
}

// Helper function
function getUserInput() {
    let bookDetails = [];
    for (let i = 0; i < 4; i++) {
        bookDetails.push(window.prompt(`Data ${i + 1}?`))
    }
    return bookDetails;
}


function displayBook(bookObject) {
    console.log(bookObject.getInfo());
    let info = document.createElement("div");
    info.style.backgroundColor = "rgb(255, 0, 0)";
    bookContainer.appendChild(info);
    info.innerHTML = bookObject.getInfo();   
}

