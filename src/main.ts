import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './style.css'; // Custom CSS file

import { addBook, displayBooks, deleteBook, Book, apiUrl, renderBookCards } from './api'; // Importing necessary functions and variables

// Initial call to display the books when the page loads
displayBooks();
// Function to render book cards and display them on the page
function displayBookCards(books: Book[]) { // Renamed to avoid conflict
    const bookList = document.getElementById('book-list');
    bookList!.innerHTML = '';

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        // Set the inner HTML with a button that calls deleteBook with the book's ID
        card.innerHTML = `
            <div class="card mb-4"> 
                <div class="card-body"> 
                    <h5 class="card-title">${book.title}</h5> 
                    <p class="card-text">${book.author}</p> 
                    <button class="btn btn-danger" id="delete-btn-${book.id}">Delete Book</button>
                </div>
            </div>
        `;

        bookList!.appendChild(card);

        // Add event listener to the delete button to call deleteBook
        const deleteBtn = document.getElementById(`delete-btn-${book.id}`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', async () => {
                await deleteBook(book.id); // Call the deleteBook function with book ID
                displayBooks(); // Refresh book list after deletion
            });
        }
    });
}

// Initial call to display the books when the page loads
displayBooks(); // Fetch and display books when the page is first loaded
