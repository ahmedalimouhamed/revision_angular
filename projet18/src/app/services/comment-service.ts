import { Injectable } from '@angular/core';
import {Comment} from '../models/comment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [];
  private nextIndex = 1;
  private currentUser: User = {
    id: 1,
    name: 'jean Dupont',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: 'jean.dupont@gmail.com'
  };

  constructor(){
    this.initializeDemoData();
  }

  private initializeDemoData(){
    this.comments = [
      {
        id: 1,
        content: 'C est super',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 1,
          name: 'jean Dupont',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          email: 'jean.dupont@gmail.com'
        },
        likes: 0,
        isLiked: false,
        replies: [
          {
            id: this.nextIndex++,
            content: 'C est super',
            createdAt: new Date(),
            updatedAt: new Date(),
            user: {
              id: 2,
              name: 'marie Dupont',
              avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
              email: 'marie.dupont@gmail.com'
            },
            likes: 0,
            isLiked: false,
            replies: [],
            mentions: ['jean Dupont']
          }
        ],
        mentions: []
      },
      {
        id: this.nextIndex++,
        content: 'C est ginial',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 2,
          name: 'Sophie Lamarre',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          email: 'sophie.lamarre@gmail.com'
        },
        likes: 0,
        isLiked: false,
        replies: [],
        mentions: ['Sophie Lamarre']
      }
    ]
  }

  getComments(): Comment[] {
    return this.comments;
  }

  getUsersSuggestions(): string[] {
    return this.comments.map(c => c.user.name);
  }

  getCurrentUser(): User{
    return this.currentUser;
  }

  addComment(content: string, parentId?:number, mentions: string[] = []): Comment{
    const newComment: Comment = {
      id: this.nextIndex++,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: this.currentUser,
      likes: 0,
      isLiked: false,
      replies: [],
      mentions
    };

    if(parentId){
      const parentComment = this.findCommentById(parentId, this.comments);

      if(parentComment){
        parentComment.replies.push(newComment);
      }
    }else{
      this.comments.unshift(newComment);
    }

    return newComment;
  }

  updateComment(id: number, content: string, mentions: string[]= []): Comment | null{
    const comment = this.findCommentById(id, this.comments);

    if(comment){
      comment.content = content;
      comment.updatedAt = new Date();
      comment.mentions = mentions;
      return comment;
    }
    return null;
  }

  deleteComment(id: number): boolean{
    const index = this.comments.findIndex(c => c.id === id);
    if(index !== -1){
      this.comments.splice(index, 1);
      return true;
    }

    for(const comment of this.comments){
      const replyIndex = comment.replies.findIndex(r => r.id === id);

      if(replyIndex !== -1){
        comment.replies.splice(replyIndex, 1);
        return true;
      }
    }
    return false;
  }

  toggleLike(id: number): void{
    const comment = this.findCommentById(id, this.comments);

    if(comment){
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
    }
  }

  private findCommentById(id: number, comments: Comment[]): Comment | null{
    for(const comment of comments){
      if(comment.id === id){
        return comment;
      }
      
      if(comment.replies.length > 0){
        const found = this.findCommentById(id, comment.replies);
        if(found) return found;
      }
    }
    return null;
  }

  extractMentions(text: string): string[]{
    const mentionRegex = /@([\w\s]+)/g;
    const matches = text.match(mentionRegex);
    return matches ? matches.map(m => m.substring(1)) : [];
  }
}
