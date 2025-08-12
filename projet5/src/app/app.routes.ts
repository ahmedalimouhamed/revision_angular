import { Routes } from '@angular/router';
import { ArticleList } from './components/article-list/article-list';
import { ArticleForm } from './components/article-form/article-form';
import { ArticleDetails } from './components/article-details/article-details';

export const routes: Routes = [
    {path: '', component: ArticleList},
    {path: 'add', component: ArticleForm},
    {path: 'edit/:id', component: ArticleForm},
    {path: 'article/:id', component: ArticleDetails}
];
