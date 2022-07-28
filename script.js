let COLORS = ["rgba(4, 106, 67, 0.4)", "rgba(40, 59, 64, 0.4)", "rgba(97, 44, 26, 0.4)"]; 

let bookContainer = document.querySelector('.book-container');
let body = document.querySelectorAll('.body');
let exit = document.querySelector('.close');

// Event listeners
document.querySelector(".new-book").addEventListener('click', showForm);
document.getElementById("popupform").addEventListener('submit', handleForm);
exit.addEventListener('click', exitForm);

// All book objects are stored in an array
let myLibrary = [];

// Object constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = parseInt(pages);
    this.isRead = isRead;
    let isReadInWords = this.isRead === '1'? "read":"not read yet";
    this.getInfo =  () => `${this.title} by ${this.author}, \
        ${this.pages} pages, ` + isReadInWords;
}

// Adding a book through user input
function addBookToLibrary(newBook) {
    const newBookObject = new Book(...newBook);
    myLibrary.push(newBookObject);
    displayBook(newBookObject);
}

function showForm() {
    document.getElementById("popupform").classList.remove("hidden");
    body[0].classList.add("blurred");
    body[1].classList.add("blurred");
}


// Display a single book as a card
function displayBook(bookObject) {
    let info = document.createElement("div");
    info.style.backgroundColor =  COLORS[Math.floor(Math.random() * COLORS.length)];//"rgba(97, 44, 26, 0.4)";
    info.classList.add("card");

    let readButton = document.createElement("button");
    readButton.classList.add("read-status-btn");
    readButton.innerText = "Change read status";

    let deleteBook = document.createElement("button");
    deleteBook.classList.add("del-book");
    deleteBook.innerText = "Delete book";

    let details = document.createElement("p");
    details.innerHTML = `<p>${bookObject.title}</p> <p>Author: ${bookObject.author}</p> \
    <p>Pages: ${bookObject.pages}</p> <p>${bookObject.isRead === '1'? "Read":"Not read yet"}</p>`;

    info.appendChild(details);
    info.appendChild(readButton);
    info.appendChild(deleteBook);
    
    bookContainer.appendChild(info);  
}



function handleForm(event) { 
    event.preventDefault(); 

    var isRead = document.getElementsByName('read');
    var read_value;
    for(var i = 0; i < isRead.length; i++){
        if(isRead[i].checked){
            read_value = isRead[i].value;
        }
    }
    newBookDetails = [title.value, author.value, pages.value, read_value]
    document.getElementById("form").reset();
    document.getElementById("popupform").classList.add("hidden");
    body[0].classList.remove("blurred")
    body[1].classList.remove("blurred")
    return addBookToLibrary(newBookDetails);
} 

function exitForm(event) {
    event.preventDefault(); 
    document.getElementById("form").reset();
    document.getElementById("popupform").classList.add("hidden");
    body[0].classList.remove("blurred")
    body[1].classList.remove("blurred")
}