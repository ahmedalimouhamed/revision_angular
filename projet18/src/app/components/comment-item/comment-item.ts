import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment';
import { UserAvatar } from '../user-avatar/user-avatar';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { CommonModule } from '@angular/common';
import { HighlightMention } from '../../directives/highlight-mention';
import { AutoExpand } from '../../directives/auto-expand';
import { FormsModule } from '@angular/forms';
import { CopyToClipboard } from '../../directives/copy-to-clipboard';
import { CommentForm } from '../comment-form/comment-form';

@Component({
  selector: 'app-comment-item',
  imports: [
    CommonModule,
    UserAvatar,
    TimeAgoPipe,
    HighlightMention,
    AutoExpand,
    FormsModule,
    CopyToClipboard,
    CommentForm
  ],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss'
})
export class CommentItem {
  @Input() comment: Comment | null = null;
  @Input() isReply: boolean = false;
  @Output() like = new EventEmitter<number>();
  @Output() reply = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Comment>();
  @Output() delete = new EventEmitter<number>();
  @Output() copyLink = new EventEmitter<number>();

  isReplying: boolean = false;
  isEditing: boolean = false;
  editedContent: string = '';
  showMenu: boolean = false;

  onLike(){
    if(this.comment){
      this.like.emit(this.comment.id);
    }
  }

  onReply(){
    if(this.comment){
      this.reply.emit(this.comment.id);
      this.isReplying = true;
    }
  }

  onEdit(){
    if(this.comment){
      this.editedContent = this.comment.content;
      this.isEditing = true;
    }
  }

  onSaveEdit(){
    if(this.comment && this.editedContent.trim()){
      this.edit.emit({
        ...this.comment,
        content: this.editedContent
      });
      this.isEditing = false;
    }
  }

  onCancelEdit(){
    this.isEditing = false;
    this.editedContent = '';
  }

  onDelete(){
    if(this.comment){
      this.delete.emit(this.comment.id);
    }
  }

  onCopyLink(){
    if(this.comment){
      this.copyLink.emit(this.comment.id);
    }
  }

  onCommentSubmitted(content: string){
    this.isReplying = false;
  }

  onCancelReply(){
    this.isReplying = false;
  }
}
