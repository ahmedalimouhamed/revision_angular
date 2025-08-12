import { Component, inject } from '@angular/core';
import { DatePipe, NgClass, NgIf, NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookService } from '../../../services/books/book';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-book-list',
  imports: [
    DatePipe, 
    NgClass,
    NgIf,
    NgFor,
    RouterLink,
    RouterOutlet,
    FormsModule
  ],
  template: `
    <h2>Collection de Livres</h2>

    <div class="borrower-input">
        <input [(ngModel)]="currentBorrower" placeholder="Nom du pretataire">
    </div>

    <div class="books-grid">
        <div *ngFor="let book of bookService.books(); trackBy: trackBookById">
            <div class="book-card" [ngClass]="{'borrowed': !book.available}">
                <h3>{{book.title}}</h3>
                <p>Auteur : {{book.author}}</p>
                <p>Genre : {{book.genre}}</p>
                <p>ISBN : {{book.isbn}}</p>
                <p>Date de publication : {{book.publicationDate | date}}</p>
                <ng-container *ngIf="book.available">
                    <button (click)="borrow(book.id)">Emprunter</button>
                </ng-container>
                <ng-container *ngIf="!book.available">
                    <div class="borrowed-info">
                        <p>Emprunté par : {{book.borrowedBy}}</p>
                        <p>Date d'emprunt : {{book.borrowDate | date: 'short'}}</p>
                        <button (click)="bookService.returnBook(book.id)">Retourner</button>
                    </div>
                </ng-container>
                <a [routerLink]="['/books', book.id, 'edit']">Modifier</a>
                <a [routerLink]="['/books/add']" class="add-button">+ Ajouter un livre</a>
            </div>
        </div>
    </div>
    
    <!-- Router outlet pour les routes enfants (formulaires) -->
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./book-list.scss']
})
export class BookList {
  bookService = inject(BookService);
  currentBorrower = '';

  trackBookById(index: number, book: any): string {
    return book.id;
  }

  borrow(bookId: string) {
    if (this.currentBorrower.trim()) {
      this.bookService.borrowBook(bookId, this.currentBorrower);
      this.currentBorrower = '';
    }
  }
}
