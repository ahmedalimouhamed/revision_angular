import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Observable, of } from 'rxjs';
import { QuizResult } from '../models/quiz-result';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  private questions: Question[] = [
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      id: 2,
      text: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Jupiter'
    },
    {
      id: 3,
      text: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Cu', 'Fe'],
      correctAnswer: 'Au'
    },
    {
      id: 4,
      text: 'What is the largest mammal on Earth?',
      options: ['Elephant', 'Giraffe', 'Hippopotamus', 'Kangaroo'],
      correctAnswer: 'Elephant'
    },
    {
      id: 5,
      text: 'What is the smallest country in the world?',
      options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
      correctAnswer: 'Vatican City'
    }
  ];

  getQuestions(): Observable<Question[]> {
    return of(this.questions);
  }

  calculateScore(answers: Map<number, string>): QuizResult {
    let correctAnswers = 0;

    this.questions.forEach((q: Question) => {
      if(answers.get(q.id) === q.correctAnswer) correctAnswers++;
    });

    return {
      score: correctAnswers,
      totalQuestions: this.questions.length
    }
    
  }

}
