import { Injectable, signal } from '@angular/core';
import {Book} from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly STORAGE_KEY = "library_books";

  books = signal<Book[]>(this.loadInitialBooks());

  private loadInitialBooks(): Book[]{

    if(typeof localStorage === 'undefined'){
      return this.generateSampleBooks();
    }
    const data = localStorage.getItem(this.STORAGE_KEY);

    return data ? JSON.parse(data) : this.generateSampleBooks();
  }

  private generateSampleBooks(): Book[]{
    return [
      {
        id: crypto.randomUUID(),
        title: "Le petit Prince",
        author: "Antoine de Saint-Exupéry",
        isbn: "1234567890",
        publicationDate: new Date(1943, 3, 6),
        genre: "Roman",
        available: true,
      },
      {
        id: crypto.randomUUID(),
        title: "Le Seigneur des Anneaux",
        author: "J.R.R. Tolkien",
        isbn: "1234567999",
        publicationDate: new Date(1954, 3, 6),
        genre: "Sccience",
        available: true,
      }, 
      {
        id: crypto.randomUUID(),
        title: "L'histoire de la Terre",
        author: "J.R.R. Tolkien",
        isbn: "1234567479",
        publicationDate: new Date(1999, 3, 6),
        genre: "Histoire",
        available: true,
      }, 
    ];
  }

  private saveBooks(books: Book[]): void{
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    this.books.set(books);
  }

  addBook(book: Omit<Book, 'id' | 'available'>): void{
    const newBook: Book = {
      ...book,
      id: crypto.randomUUID(),
      available: true,
    };
    this.saveBooks([...this.books(), newBook]);
  }

  borrowBook(bookId: string, borrower: string): void{
    this.saveBooks(
      this.books().map((book: Book) => 
        book.id === bookId 
          ? {
            ...book,
            available: false,
            borrowedBy: borrower,
            borrowDate: new Date(),
          }
          : book
      )
    );
  }

  returnBook(bookId: string): void{
    this.saveBooks(
      this.books().map((book: Book) => 
        book.id === bookId 
          ? {
            ...book,
            available: true,
            borrowedBy: undefined,
            borrowDate: undefined,
          }
          : book
      )
    );
  }
}
