// PBL: manage books using an array of objects.
const library = [];

function addBook(title, author) {
    const book = { title: title, author: author };
    library.push(book);
}

function findBook(title) {
    return library.find(function (book) {
        return book.title === title;
    });
}

addBook("The Alchemist", "Paulo Coelho");
addBook("Wings of Fire", "A. P. J. Abdul Kalam");

console.log("--- Library Books ---");
console.log(library);
console.log("Book found:", findBook("The Alchemist"));
console.log("Missing book:", findBook("Unknown Book"));
