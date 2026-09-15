class Book {
    constructor(title, author, isBorrowed = false) {
        this.title = title
        this.author = author
        this.isBorrowed = isBorrowed
    }

    toggleBorrowStatus() {
        this.isBorrowed = !this.isBorrowed
    }
}

class Library {
    constructor() {this.books = []}

    addBook(book) {this.books.push(book)}
    removeBook(title) {
        this.books = this.books.filter(function(book) {
            return book.title.toLowerCase() !== title.toLowerCase()
        })
    }

    findBookByTitle(title) {
        return this.books.find(function(book) {
            return book.title.toLowerCase() === title.toLowerCase();
        }) || null;
    }

    getAvailableBooks() {
        return this.books.filter(function(book) {
            return !book.isBorrowed;
        });
    }

    getStatsByAuthor() {
        const stats = {}
        this.books.forEach(function(book) {
            stats[book.author] = (stats[book.author] || 0) + 1
        })
        return stats
    }
}





const library = new Library()

library.addBook(new Book("Джон Рональд", "Властелин Колец"))
library.addBook(new Book("Хадзимэ Исаяма", "Атака Титанов"))

const titleInput = document.getElementById("titleInput")
const authorInput = document.getElementById("authorInput")
const addBookBtn = document.getElementById("addBookBtn")
const searchInput = document.getElementById("searchInput")
const showStatsBtn = document.getElementById("showStatsBtn")
const filterAvailableBtn = document.getElementById("filterAvailableBtn")
const resetFilterBtn = document.getElementById("resetFilterBtn")
const booksList = document.getElementById("booksList")
const searchResult = document.getElementById("searchResult")
const listTitle = document.getElementById("listTitle")

function renderBooks(booksArray = library.books) {
    booksList.innerHTML = ""
    booksArray.forEach(function(book) {
        const li = document.createElement("li")
        
        //Info
        const infoSpan = document.createElement("span")
        infoSpan.className = "book-info"
        infoSpan.textContent = (book.title, "-", book.author)

        //Status
        const statusSpan = document.createElement('span')
        statusSpan.className = `status-badge ${book.isBorrowed ? "status-borrowed" : "status-available"}`
        statusSpan.textContent = book.isBorrowed ? "Взята" : 'Доступна'
        infoSpan.appendChild(statusSpan)

        //Btns
        const actionsDiv = document.createElement("div")
        actionsDiv.className = "actions"

        const toggleBtn = document.createElement("button")
        toggleBtn.textContent = book.isBorrowed ? "Вернуть" : "Взять"
        toggleBtn.className = "secondary"
        toggleBtn.onclick = function() {
            book.toggleBorrowStatus()
            renderBooks(booksArray)
        }

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Удалить"
        deleteBtn.className = "danger"
        deleteBtn.onclick = function() {
            library.removeBook(book.title)
            renderBooks()
        }

        actionsDiv.appendChild(toggleBtn)
        actionsDiv.appendChild(deleteBtn)
        
        li.appendChild(infoSpan)
        li.appendChild(actionsDiv)
        booksList.appendChild(li)
    })
}

addBookBtn.addEventListener("click", function() {
    const title = titleInput.value.trim()
    const author = authorInput.value.trim()

    if (!title || !author) {
        alert("Заполните оба поля!")
        return
    }

    if (library.findBookByTitle(title)) {
        alert("Книга с таким названием есть в библиотеке!")
        return
    }

    const newBook = new Book(title, author)
    library.addBook(newBook)
    
    titleInput.value = ""
    authorInput.value = ""
    renderBooks()
})

searchInput.addEventListener("input", function() {
    const query = searchInput.value.trim()
    if (!query) {
        searchResult.style.display = "none"
        return
    }

    const foundBook = library.findBookByTitle(query)
    searchResult.style.display = "block"
    
    if (foundBook) {
        searchResult.textContent = `Найдено:\n"${foundBook.title}" (${foundBook.author}) — ${foundBook.isBorrowed ? 'Взята' : 'Доступна'}`;
    } else {
        searchResult.textContent = "Книга не найдена"
    }
})

showStatsBtn.addEventListener("click", function() {
    if (searchResult.style.display === "block" && searchResult.textContent.includes("Статистика")) {
        searchResult.style.display = "none"
        return
    }

    const stats = library.getStatsByAuthor();
    searchResult.style.display = "block"
    
    if (Object.keys(stats).length === 0) {
        searchResult.textContent = "В библиотеке пока нет книг."
        return
    }

    let statsText = "Статистика по авторам:\n"
    for (const [author, count] of Object.entries(stats)) {
        statsText += `${author}: ${count} книг(a/и)\n`
    }
    searchResult.textContent = statsText.trim()
})

filterAvailableBtn.addEventListener("click", function() {
    listTitle.textContent = "Доступные книги"
    renderBooks(library.getAvailableBooks())
})

resetFilterBtn.addEventListener("click", function() {
    listTitle.textContent = "Список книг"
    renderBooks(library.books)
})

renderBooks()
