import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.apiUrl)
  }

  getArticle(id: number): Observable<Article>{
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  createArticle(article:Article): Observable<Article>{
    return this.http.post<Article>(this.apiUrl,article);
  }

  updateArticle(id:number,article:Article): Observable<Article>{
    return this.http.put<Article>(`${this.apiUrl}/${id}`,article);
  }

  deleteArticle(id:number): Observable<Article>{
    return this.http.delete<Article>(`${this.apiUrl}/${id}`);
  }
  
}
