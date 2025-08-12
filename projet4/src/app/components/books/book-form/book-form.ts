import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../../models/book.model';

@Component({
  standalone: true,
  selector: 'app-book-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.scss']
})
export class BookForm implements OnInit {
  @Input() book?: Book;
  @Output() save = new EventEmitter<Omit<Book, 'id'|'available'>>();

  genres = ['Roman', 'Sccience', 'Histoire', 'Poésie'];

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    isbn: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^\d{10,13}$/)
    ]),
    publicationDate: new FormControl('', Validators.required),
    genre: new FormControl('Roman', Validators.required),
  });

  ngOnInit(): void {
    if (this.book) {
      this.form.patchValue({
        ...this.book,
        publicationDate: this.book.publicationDate.toISOString().split('T')[0],
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      const formValue = this.form.value;
      this.save.emit({
        title: formValue.title!,
        author: formValue.author!,
        isbn: formValue.isbn!,
        publicationDate: new Date(formValue.publicationDate!),
        genre: formValue.genre! as Book['genre'],
      });
    }
  }
}
