import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'books/list',
        loadComponent: () => import('./components/books/book-list/book-list').then(m => m.BookList)
    },
    {
        path: 'books/add',
        loadComponent: () => import('./components/books/book-form-container/book-form-container').then(m => m.BookFormContainer),
        title: 'Ajouter un livre'
    },
    {
        path: 'books/:id/edit',
        loadComponent: () => import('./components/books/book-form-container/book-form-container').then(m => m.BookFormContainer),
        title: 'Modifier le livre'
    },
    {
        path: 'books',
        redirectTo: 'books/list',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'books/list',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'books/list'
    }
];
