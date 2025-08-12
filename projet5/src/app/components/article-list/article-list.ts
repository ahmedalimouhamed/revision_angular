import { Component } from '@angular/core';
import { ArticleService } from '../../services/article-service';
import { Router, RouterLink } from '@angular/router';
import { Article } from '../../models/article';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './article-list.html',
  styleUrl: './article-list.scss'
})
export class ArticleList implements OnInit {
  articles: Article[] | null = null;

  constructor(
    private articleService: ArticleService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.cdr.detectChanges();
      },
      (error: Error | unknown) => {
        if(error instanceof Error){
          console.error('Error fetching articles:', error.message);
        }else{
          console.error('Error fetching articles:', error);
        }
      }
    );
  }

  deleteArticle(id: number): void {
    console.log("deleting article with id: ", id);
    this.articleService.deleteArticle(id).subscribe(
      () => {
        this.loadArticles();
      },
      (error: Error | unknown) => {
        if(error instanceof Error){
          console.error('Error deleting article:', error.message);
        }else{
          console.error('Error deleting article:', error);
        }
      }
    );
  }
}
