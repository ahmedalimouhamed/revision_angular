import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list-component/recipe-list-component';
import { RecipeDetailsComponent } from './components/recipe-details-component/recipe-details-component';
import { RecipeFormComponent } from './components/recipe-form-component/recipe-form-component';

export const routes: Routes = [
    {path: '', component: RecipeListComponent},
    {path: 'add', component: RecipeFormComponent},
    {path: 'recipe/:id', component: RecipeDetailsComponent},
    {path: 'recipe/:id/edit', component: RecipeFormComponent},
    {path: '**', redirectTo: ''}
];
