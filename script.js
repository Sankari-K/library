let COLORS = ["rgba(40, 59, 64, 0.4)", "rgba(97, 44, 26, 0.4)", "rgba(4, 106, 67, 0.4)"]; 

// DOM elements
let bookContainer = document.querySelector('.book-container');
let body = document.querySelectorAll('.body');
let exit = document.querySelector('.close');
let stats = document.querySelectorAll('.stats > li');

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
    info.style.backgroundColor =  COLORS[(bookObject.isRead == 1) + 1];// COLORS[Math.floor(Math.random() * COLORS.length)];
    info.classList.add("card");
    info.setAttribute('id', myLibrary.length);

    let readButton = document.createElement("button");
    readButton.classList.add("read-status-btn");
    readButton.innerText = "Change read status";
    readButton.addEventListener('click', changeReadStatus);

    let deleteBook = document.createElement("button");
    deleteBook.classList.add("del-book");
    deleteBook.innerText = "Delete book";
    deleteBook.addEventListener('click', toDeleteBook);

    let details = document.createElement("p"); 
    details.innerHTML = `<p>${bookObject.title}</p> <p>${bookObject.author}</p> \
    <p>${bookObject.pages} pages</p>`;

    info.appendChild(details);
    info.appendChild(readButton);
    info.appendChild(deleteBook);
    
    bookContainer.appendChild(info);  
    updateStats();
}


function updateStats() {
    let readStats = [myLibrary.length, 0, 0];
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].isRead == 1) {
            readStats[2] += 1;
        }
    }
    let counter = 0;
    readStats[1] = readStats[0] - readStats[2];
    stats.forEach((item) => {
        let textField = item.querySelector("span");
        textField.innerText = readStats[counter];
        counter += 1;
    });
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
    newBookDetails = [title.value, author.value, pages.value, read_value];
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


for (let i = 0; i < stats.length; i++) {
    stats[i].style.backgroundColor = COLORS[i];
}

function changeReadStatus(event) {
   myLibrary[event.composedPath()[1].id - 1].isRead = myLibrary[event.composedPath()[1].id - 1].isRead == 1 ? 0 : 1;
   event.composedPath()[1].style.backgroundColor =  COLORS[(myLibrary[event.composedPath()[1].id - 1].isRead === 1) + 1];
   updateStats();
}

function toDeleteBook(event) {
    let idToDelete = event.composedPath()[1].id;
    let elementToDelete = document.getElementById(idToDelete);
    elementToDelete.remove();
    myLibrary.splice(idToDelete - 1, 1);

    for (let i = 0; i < bookContainer.childNodes.length; i++) {
        bookContainer.childNodes[i].id = myLibrary.indexOf(bookContainer.childNodes[i]) + 2;
    }
    updateStats();
}