export type Book = {
    id: number;
    title: string;
    author: string;
};

export const apiUrl = 'http://localhost:3000/books';

// Function to display books
export async function displayBooks(): Promise<void> {
    try {
        const response: Response = await fetch(apiUrl);
        const books: Book[] = await response.json();

        // Call renderBookCards to display the books
        renderBookCards(books); // Update this line to call renderBookCards

    } catch (error) {
        console.error('Error displaying books:', error);
    }
}

// Function to render book cards
export function renderBookCards(books: Book[]) {
    const booksContainer = document.getElementById('books-container');
    if (booksContainer) {
        booksContainer.innerHTML = ''; // Clear previous book entries

        // Loop through the books and display them in the container
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-card'); // Optional styling class
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <button id="delete-btn-${book.id}" class="btn btn-danger">Delete</button>
            `;
            booksContainer.appendChild(bookElement);
        });
    }
}

// Adds a new book
export async function addBook(): Promise<void> {
    const newBook: Book = {
        title: (document.getElementById('title') as HTMLInputElement).value,
        author: (document.getElementById('author') as HTMLInputElement).value,
        id: 0 // Placeholder; ID will be assigned later
    };

    try {
        const response: Response = await fetch(apiUrl); 
        const existingBooks: Book[] = await response.json();

        const nextId: number = existingBooks.length > 0 ? Math.max(...existingBooks.map(book => book.id)) + 1 : 1;
        newBook.id = nextId; 

        const postResponse: Response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(newBook)
        });

        if (postResponse.ok) {
            console.log('Book added successfully!');
            displayBooks(); // Refresh the book list after adding the new book
        }
    } catch (error) {
        console.error('Error adding book:', error); 
    }

    (document.getElementById('title') as HTMLInputElement).value = ''; // Clear the title input
    (document.getElementById('author') as HTMLInputElement).value = ''; // Clear the author input
}

// Function to delete a book by its ID
export async function deleteBook(id: number): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            console.log('Book deleted successfully');
        } else {
            console.error('Error deleting book:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

// Add event listener to the form
document.getElementById('add-book-form')?.addEventListener('submit', async function (e: Event) {
    e.preventDefault(); // Prevent the page from automatically refreshing
    await addBook(); // Call addBook function
});

