function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    let isReadInWords = isRead ? "read":"not read yet";
    this.getInfo =  () =>
        `${this.title} by ${this.author}, ${this.pages} pages, ` + isReadInWords;
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false)
console.log(theHobbit.getInfo());