import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article-service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-article-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.html',
  styleUrl: './article-form.scss'
})
export class ArticleForm implements OnInit {
  articleForm: FormGroup;
  isEditMode: boolean = false;
  articleId?: number;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params['id']){
        this.isEditMode = true;
        this.articleId = +params['id'];
        this.loadArticle(this.articleId);
      }
    })
  }

  loadArticle(id: number): void{
    this.articleService.getArticle(id).subscribe(
      (article: Article) => {
        this.articleForm.patchValue(article);
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

  onSubmit(): void{
    if(this.articleForm.valid){
      const article : Article = this.articleForm.value;
      if(this.isEditMode && this.articleId){
        this.articleService.updateArticle(this.articleId,article).subscribe(
          () => {
            this.router.navigate(['/']);
          },
          (error: Error | unknown) => {
            if(error instanceof Error){
              console.error('Error updating article:', error.message);
            }else{
              console.error('Error updating article:', error);
            }
          }
        )
      }else{
        this.articleService.createArticle(article).subscribe(
          () => {
            this.router.navigate(['/']);
          },
          (error: Error | unknown) => {
            if(error instanceof Error){
              console.error('Error creating article:', error.message);
            }else{
              console.error('Error creating article:', error);
            }
          }
        )
      }
    }
  }
}
