import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment-service';
import { Comment } from '../../models/comment';
import { CommentForm } from '../comment-form/comment-form';
import { CommentItem } from '../comment-item/comment-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  imports: [CommonModule, CommentForm, CommentItem],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss'
})
export class CommentList implements OnInit {
  comments: Comment[] = [];
  replyingTo: number | null = null;

  constructor(private commentService: CommentService){}

  ngOnInit(): void {
    this.comments = this.commentService.getComments();
  }

  onLike(commentId: number){
    this.commentService.toggleLike(commentId);
  }

  onReply(commentId: number){
    this.replyingTo = commentId;
  }

  onCommentSubmitted(content: string){
    if(this.replyingTo){
      this.commentService.addComment(content, this.replyingTo);
      this.replyingTo = null;
    }else{
      this.commentService.addComment(content);
    }

    this.comments = this.commentService.getComments();
  }

  onEdit(updatedComment: Comment){
    this.commentService.updateComment(updatedComment.id, updatedComment.content, updatedComment.mentions);
    this.comments = this.commentService.getComments();
  }

  onDelete(commentId: number){
    if(confirm("Etes-vous sur de vouloir supprimer ce commentaire?")){
      this.commentService.deleteComment(commentId);
      this.comments = this.commentService.getComments();
    }
  }

  onCopyLink(commentId: number){
    const url = `${window.location.origin}${window.location.pathname}#comment-${commentId}`;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Lien copié dans le presse-papier');
    });
  }

  onCancelReply(){
    this.replyingTo = null;
  }
}
