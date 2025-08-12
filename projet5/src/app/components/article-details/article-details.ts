import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article-service';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-details',
  imports: [CommonModule, DatePipe],
  templateUrl: './article-details.html',
  styleUrl: './article-details.scss'
})
export class ArticleDetails implements OnInit {
  article?: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ){}

  ngOnInit(): void{
    const id = +this.route.snapshot.params['id'];
    this.articleService.getArticle(id).subscribe((article: Article) => {
      this.article = article;
    },
    (error: Error | unknown) => {
      if(error instanceof Error){
        console.error('Error fetching article:', error.message);
      }else{
        console.error('Error fetching article:', error);
      }
    }
    )
  }
}
