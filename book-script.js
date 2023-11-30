const container = document.getElementById("cards");
const button_add = document.getElementById("button_add");
const dialog_add = document.getElementById("dialog_add");
const form_add = document.getElementById("form_add");
const button_remove = document.getElementById("remove");
const button_cancel = document.getElementById("cancel");
const button_submit = document.getElementById("submit");

const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(bookItem) {
    myLibrary.push(bookItem);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function updateReadStatus(bookItem) {
    if (myLibrary[bookItem].read == 'have read') {
        myLibrary[bookItem].read = "not read yet"
    } else {
        myLibrary[bookItem].read = "have read"
    }
}

function redrawAllCards() {
    for (let i=0; i < myLibrary.length; i++) {
        drawCard(i);
    }
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
const book2 = new Book('The Colour of Magic', 'Terry Pratchett', 288, 'have read');
const book3 = new Book('Dune', 'Frank Herbert', 896, 'have read');
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

// render a card
function drawCard(i) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    //for (let key in myLibrary[i]) {
    //    if (myLibrary[i].hasOwnProperty(key)) {
    //        cardElement.innerHTML += JSON.stringify(myLibrary[i][key]).replace(/['"]+/g, '');
    //    }
    //}
    const details_title = document.createElement('div');
    details_title.classList.add('title-bar');
    details_title.innerHTML += "<h3>" + (JSON.stringify(myLibrary[i].title)).replace(/"/g, '') + "</h3>";
    cardElement.appendChild(details_title);

    const details = document.createElement('div');
    details.classList.add('cardElement-bar');
    // Author
    details.innerHTML += "<p class='details-header'>Author:</p>";
    details.innerHTML += "<p class='details-info'>" + JSON.stringify(myLibrary[i].author).replace(/"/g, '') + "</p>";
    // Pages
    details.innerHTML += "<p class='details-header'>Pages:</p>";
    details.innerHTML += "<p class='details-info'>" + JSON.stringify(myLibrary[i].pages).replace(/"/g, '') + "</p>";
    // Read status
    details.innerHTML += "<p class='details-header'>Read:</p>";
    const read_status = document.createElement('p');
    read_status.classList.add('details-info');
    read_status.innerHTML = JSON.stringify(myLibrary[i].read).replace(/"/g, '');
    details.appendChild(read_status);
    cardElement.appendChild(details);

    // action buttons on card
    const actions = document.createElement('div');
    actions.classList.add('action-bar');
    // change read status button
    const readButton = document.createElement('button');
    const details_read = document.getElementById("details_read_${i}");
    readButton.textContent = 'Toggle Read'
    readButton.addEventListener('click', () => {
        updateReadStatus(i);
        console.log(myLibrary);
        read_status.innerHTML = JSON.stringify(myLibrary[i].read).replace(/"/g, '');
    });
    // remove card button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeBookFromLibrary(i)
        cardElement.remove();
        console.log(myLibrary);
        const test = `try ${i}`;
        console.log(test);
    });
    actions.appendChild(readButton);
    actions.appendChild(removeButton);
    cardElement.appendChild(actions);

    
    container.appendChild(cardElement);
}

// render all cards in myLibrary
redrawAllCards();

console.log(myLibrary);

// add function to remove buttons
button_add.addEventListener("click", () => {
    dialog_add.showModal();
});

// add function to button for pop up dialog box
button_add.addEventListener("click", () => {
    dialog_add.showModal();
});

// Form close button closes the dialog box
button_cancel.addEventListener("click", (e) => {
    e.preventDefault();
    dialog_add.close();
    form_add.reset();
    console.log(myLibrary);
});


// add function to dialog box
button_submit.addEventListener("click", (e) => {
    e.preventDefault();
    let input_title = document.getElementById("title");
    let input_author = document.getElementById("author");
    let input_pages = document.getElementById("page");
    let input_read = document.getElementById("read");

    // Form submit button sends input to myLibrary
    if (input_title.value == "" || input_author.value == "" || input_pages.value == "") {
        alert("Please ensure you input a value in all fields.");
    } else {
        const book_new = new Book(input_title.value, input_author.value, parseInt(input_pages.value), input_read.value);
        addBookToLibrary(book_new);
        console.log(myLibrary);
        console.log("added!");
        dialog_add.close();
        form_add.reset();
        drawCard(myLibrary.length - 1);
    }
});
