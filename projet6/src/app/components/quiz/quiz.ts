import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { QuizService } from '../../services/quiz-service';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../result/result';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, ResultComponent],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class QuizComponent implements OnInit {

  questions: Question[] = [];
  currentQuestionIndex= 0;
  selectedAnswer: string| null = null;
  score = 0;
  quizCompleted = false;

  constructor(private quizService: QuizService){}

  ngOnInit():void{
    this.quizService.getQuestions().subscribe((qns: Question[])=> {
      this.questions = qns;
    })
  }

  onAnswerSelected(answer: string): void{
    this.selectedAnswer = answer;
  }

  nextQuestion(): void{
    if(this.selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer){
      this.score++;
    }

    this.selectedAnswer = null;
    this.currentQuestionIndex++;
    if(this.currentQuestionIndex >= this.questions.length){
      this.quizCompleted = true;
    }
  }

}
