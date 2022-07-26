let bookContainer = document.querySelector('.book-container')

// Event listeners
document.querySelector(".new-book").addEventListener('click', showForm);
document.getElementById("popupform").addEventListener('submit', handleForm);

// All book objects are stored in an array
let myLibrary = [];

// Object constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = parseInt(pages);
    this.isRead = isRead;
    let isReadInWords = this.isRead == '1'? "read":"not read yet";
    this.getInfo =  () => `${this.title} by ${this.author}, \
        ${this.pages} pages, ` + isReadInWords;
}

// Adding a book through user input
function addBookToLibrary(newBook) {
    // let newBook = getUserInput();
    const newBookObject = new Book(...newBook);
    myLibrary.push(newBookObject);
    displayBook(newBookObject);
}

function showForm() {
    document.getElementById("popupform").classList.remove("hidden");
}

// Display a single book as a card
function displayBook(bookObject) {
    let info = document.createElement("div");
    info.style.backgroundColor = "rgb(97, 44, 26)";
    info.classList.add("card");
    bookContainer.appendChild(info);
    info.innerHTML = bookObject.getInfo();   
}



function handleForm(event) { 
    event.preventDefault(); 
    document.getElementById("popupform").classList.add("hidden");

    var isRead = document.getElementsByName('read');
    var read_value;
    for(var i = 0; i < isRead.length; i++){
        if(isRead[i].checked){
            read_value = isRead[i].value;
        }
    }
    newBookDetails = [title.value, author.value, pages.value, read_value]
    document.getElementById("form").reset();
    return addBookToLibrary(newBookDetails);
} 

