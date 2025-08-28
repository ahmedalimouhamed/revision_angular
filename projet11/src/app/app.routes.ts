import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { RecipeDetails } from './components/recipe-details/recipe-details';
import { RecipeForm } from './components/recipe-form/recipe-form';

export const routes: Routes = [
    {path: '', component: RecipeList},
    {path: 'recipe/:id', component: RecipeDetails},
    {path: 'add', component: RecipeForm},
    {path: 'edit/:id', component: RecipeForm},
    {path: '**', redirectTo: ''}
];
