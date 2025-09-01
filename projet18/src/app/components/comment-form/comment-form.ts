import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommentService } from '../../services/comment-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoExpand } from '../../directives/auto-expand';

@Component({
  selector: 'app-comment-form',
  imports: [
    CommonModule,
    FormsModule,
    AutoExpand
  ],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss'
})
export class CommentForm {
  @Input() placeholder: string = "Ajouter un commentaire...";
  @Input() replyMode: boolean = false;
  @Input() parentId?: number;
  @Output() commentSubmitted = new EventEmitter<string>();
  @Output() cancelReply = new EventEmitter<void>();

  @ViewChild('textarea') textarea!: ElementRef;

  demoUsers: string[] = [
    'jean Dupont',
    'marie Dupont',
    'Sophie Lamarre',
    'Mathieu Martin',
    'Lucie Dubois',
    'Pierre Moreau',
    'Valérie Lefebvre',
    'Olivier Rousseau',
    'Camille Bernard',
    'Laurent Durand'
  ];

  commentText: string = '';

  constructor(private commentService: CommentService){}

  getUsersSuggestions(): string[] {
    if(!this.commentText.includes('@')) return [];
    const currentText = this.commentText.substring(
      this.commentText.lastIndexOf('@') + 1
    ).toLowerCase();

    if(!currentText) return this.demoUsers;

    return this.demoUsers.filter((user: string) => 
      user.toLowerCase().includes(currentText)
    )
  }

  onSubmit(){
    if(this.commentText.trim()){
      const mentions = this.commentService.extractMentions(this.commentText);
      this.commentSubmitted.emit(this.commentText);
      this.commentText = '';
    }
  }

  onCancel(){
    this.commentText = '';
    this.cancelReply.emit();
  }

  onKeydown(event: KeyboardEvent){
    if(event.key === 'enter' && !event.shiftKey){
      event.preventDefault();
      this.onSubmit();
    }
  }

  insertMention(username: string){
    const textarea = this.textarea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    this.commentText = this.commentText.substring(0, start) + `@${username}` + this.commentText.substring(end);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + username.length + 2;
    })
  }
}
