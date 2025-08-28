import { Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';
import { MovieForm } from './components/movie-form/movie-form';

export const routes: Routes = [
    {path:'', component: MovieList},
    {path: 'add', component: MovieForm},
    {path: 'edit/:id', component: MovieForm}
];
