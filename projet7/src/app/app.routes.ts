import { Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list-component/expense-list-component';
import { ExpenseFormComponent } from './components/expense-form-component/expense-form-component';

export const routes: Routes = [
    {path: '', component: ExpenseListComponent},
    {path: 'add', component: ExpenseFormComponent},
    {path: '**', redirectTo: ''}
];
