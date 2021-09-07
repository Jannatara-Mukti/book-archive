const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //Empty Feilde Handle
    if(searchText === ''){
        const error = document.getElementById('error');
        error.innerText = "Search Field can not be empty";
        const bookContainer = document.getElementById("book-container");
        bookContainer.textContent = '';
        return;
    }
    searchField.value = '';
    toggleSpinner("block");
    toggleSearchBooks("none");
    //Fetch Data from URL
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))
}

//Toggle spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//Toggle Search-Result
const toggleSearchBooks = displayStyle => {
    document.getElementById('book-result').style.display = displayStyle;
}

//Display Books
const displayBooks = data => {
    const totalBooks = document.getElementById("total-books");
    totalBooks.textContent = '';
    //Book Number
    const p = document.createElement('p');
    p.innerHTML =  `
        Total Results Found: ${data.numFound}. ${data.docs.length} are shown.
    `;
    totalBooks.appendChild(p);

    const books = data.docs;
    //Handle Error
    const errorMessage = document.getElementById('error') ;
    if(books.length === 0){ 
        errorMessage.innerText =`No Results Found`;
    }
    const bookContainer = document.getElementById("book-container");
    bookContainer.textContent = '';
    //ForEach to see Books
    books?.forEach(book => {
        errorMessage.innerText = '';
        const div = document.createElement('div');
        div.classList.add = 'card';
        //Book Image URL
        const imageUrl = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
        div.innerHTML = `
                <div class="bg-secondary d-flex border-2 border-secondary text-white rounded">
                <img width=200px src="${imageUrl}" alt="">
    
                <div class="card-body">
                   <h3>Book Name: ${book.title ? book.title : 'didn\'t found'}</h3>
                   <p><b>Authors:</b> ${book.author_name ? book.author_name :  'didn\'t found'}</p>
                   <p><b>First Published Year:</b> ${book.first_publish_year ? book.first_publish_year : 'didn\'t found'}</p>
                   <p><b>Publisher:</b> ${book.publisher ? book.publisher : 'didn\'t found'}</p>
                </div>
                </div>
        `;
        bookContainer.appendChild(div);
    
    });
    toggleSpinner("none");
    toggleSearchBooks("block");
}