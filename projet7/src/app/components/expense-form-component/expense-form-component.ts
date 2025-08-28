import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { ExpenseCategory } from '../../models/expense-category';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { inject } from '@angular/core';
import { Expense } from '../../models/expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-form-component',
  imports: [ReactiveFormsModule, CommonModule, RouterLink ],
  templateUrl: './expense-form-component.html',
  styleUrl: './expense-form-component.scss'
})
export class ExpenseFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  categories= Object.values(ExpenseCategory);
  
  form = this.fb.group({
    title: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: [ExpenseCategory.FOOD, Validators.required],
    date: [new Date(), Validators.required]
  });

  constructor(
    private expenseService: ExpenseService, 
    private router: Router, 
  ){}

  onSubmit(): void{
    if(this.form.valid){
      this.expenseService.addExpense(this.form.value as Omit<Expense, 'id'>);
      this.router.navigate(['/']);
    }
  }
}