import { Injectable } from '@angular/core';

export interface Note{
  id: string;
  title: string;
  content: string;
  favorite: boolean;
  category: 'travail' | 'perso';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly STORAGE_KEY = 'notes';

  addNote(note: Omit<Note, 'id'>){
    const notes = this.getNotes();
    const newNote = {...note, id: crypto.randomUUID(), createdAt: new Date()};
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...notes, newNote]));
  }

  getNotes(): Note[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  updateNote(id: string, changes: Partial<Note>): void{
    const notes = this.getNotes().map(n => 
      n.id === id ? {...n, ...changes} : n
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
  }

  deleteNote(id: string): void{
    const notes = this.getNotes().filter(n => n.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
  }

  toggleFavorite(id: string): void{
    const note = this.getNotes().find(n => n.id === id);

    if(note){
      this.updateNote(id, {favorite: !note.favorite});
    }
  }
}
