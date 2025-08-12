import { Component, OnInit } from '@angular/core';
import { NotesService, Note } from '../services/notes-service';
import { NoteFormComponent } from '../note-form-component/note-form-component';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-list-component',
  imports: [NoteFormComponent, DatePipe, CommonModule],
  templateUrl: './notes-list-component.html',
  styles: ``
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];

  filter: 'all' | 'favorites' |'travail' | 'perso' = 'all';

  constructor(
    private notesService: NotesService
  ){}

  ngOnInit(){
    this.loadNotes();
  }

  loadNotes(){
    this.notes = this.notesService.getNotes();
  }

  get filteredNotes(){
    return this.notes.filter(n => 
      this.filter === 'all' || 
      n.category === this.filter ||
      (this.filter === 'favorites' && n.favorite)
    );
  }

  deleteNote(id: string){
    this.notesService.deleteNote(id);
    this.loadNotes();
  }

  toggleFavorite(id: string){
    this.notesService.toggleFavorite(id);
    this.loadNotes()
  }

}
