import { Component, EventEmitter, Output } from '@angular/core';
import { NotesService, Note } from '../services/notes-service';
import { NgForm, FormsModule } from '@angular/forms';
import { TitleCasePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-form-component',
  imports: [FormsModule, TitleCasePipe, CommonModule],
  templateUrl: './note-form-component.html',
  styles: ``
})
export class NoteFormComponent {
  categories = ['travail', 'perso'];
  title: string = '';
  content: string = '';
  category: string = this.categories[0]

  @Output() noteAdded = new EventEmitter<Note>();

  constructor(private notesService: NotesService){}

  onSubmit(form: NgForm){
    if(form.valid){
      this.notesService.addNote({
        title: form.value.title,
        content: form.value.content,
        category: form.value.category,
        favorite: false,
        createdAt: new Date()
      } as Note);

      form.reset();
      this.noteAdded.emit();
    }
  }
}
