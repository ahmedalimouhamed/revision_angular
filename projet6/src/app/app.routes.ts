import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz';
import { ResultComponent } from './components/result/result';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'quiz', component: QuizComponent},
    {path: 'result', component: ResultComponent},
    {path: '**', redirectTo: ''}
];
