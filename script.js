const bookWrapper = document.querySelector('.bookWrapper')
const addBtn = document.getElementById('newBook')
const createModal = document.querySelector('.createModal')
const createForm = document.querySelector('.createForm')

let Library = JSON.parse(localStorage.getItem('Library'))

function Book (title, author, pages, readState = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
}

function addNewToLibrary() {
    this.title = createForm.title.value
    this.author = createForm.author.value
    this.pages = createForm.pages.value
    this.readState = createForm.readState.checked

    if(title, author, pages){
        const newBook = new Book(title, author, pages, readState)
        Library.push(newBook)
        localStorage.setItem('Library', JSON.stringify(Library))
        displayBooks()
        resetForm()
        
    }

}

function displayBooks(){
    console.log(Library)
    const books = JSON.parse(localStorage.getItem('Library'))

    if(books){
        const html = books.map((book, index) => {
            return `
                <div class="bookContainer" data-id=${index}>
                    <div class="bookCover"></div>
                    <p class="bookAuthor">${book.author}</p>
                    <p class="bookTitle">${book.title}</p>
                    <p class="bookPages">${book.pages} pages</p>
                    <button data-id=${index} class="btn remove" id="removeBook">remove</button>
                    <button data-id=${index} class="${book.readState ? "btn edit read" : "btn edit"}" id="editBook">${book.readState ? 'Read' : 'Not Read Yet'}</button>
                </div>`
            }).join('')
        
            bookWrapper.innerHTML = html
        
            const removeBtn = bookWrapper.querySelectorAll('#removeBook')
            removeBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    removeFromLibrary(e.target)
                })
            })
        
            const editBtn = bookWrapper.querySelectorAll('#editBook')
            editBtn.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    if(Library[this.dataset.id].readState == true){
                        Library[this.dataset.id].readState = false
                        btn.classList.remove('read')
                        btn.textContent = 'Not Read Yet'
                    } else{
                        Library[this.dataset.id].readState = true
                        btn.classList.add('read')
                        btn.textContent = 'Read'
                    }
                    localStorage.setItem('Library', JSON.stringify(Library))
                })
        })
    }
}

function removeFromLibrary(btn){
    btn.parentElement.remove()            
    Library.splice([btn.dataset.id], 1)
    localStorage.setItem('Library', JSON.stringify(Library))
    displayBooks()
}

function resetForm(){
    createForm.title.value = ""
    createForm.author.value = ""
    createForm.pages.value = ""
    createForm.readState.checked = false
    createModal.classList.remove('active')
}

createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addNewToLibrary()
})

addBtn.addEventListener('click', () => {
    createModal.classList.add('active')
})

window.onclick = function(e){
    if(e.target == createModal){
        createModal.classList.remove('active')
    }
}

displayBooks()


