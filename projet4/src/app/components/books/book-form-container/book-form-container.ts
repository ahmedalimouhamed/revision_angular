// book-form-container.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookForm } from '../book-form/book-form';
import { BookService } from '../../../services/books/book';

@Component({
  selector: 'app-book-form-container',
  standalone: true,
  imports: [CommonModule, BookForm],
  template: `
    <app-book-form 
      [book]="book"
      (save)="onSave($event)">
    </app-book-form>
  `
})
export class BookFormContainer {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  book: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Mode édition
      //const book = this.bookService.getBook(id);
      //if (book) {
        //this.book = { ...book };
      //}
    }
  }

  onSave(bookData: any) {
    if (this.book) {
      // Mise à jour
      //this.bookService.updateBook(this.book.id, bookData);
    } else {
      // Ajout
      this.bookService.addBook(bookData);
    }
    this.router.navigate(['/books/list']);
  }
}