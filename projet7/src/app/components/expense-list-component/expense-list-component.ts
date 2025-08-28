import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpenseCategory } from '../../models/expense-category';
import { ExpenseService } from '../../services/expense-service';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseChartComponent } from '../expense-chart-component/expense-chart-component';

@Component({
  selector: 'app-expense-list-component',
  imports: [CurrencyPipe, DatePipe, NgFor, RouterLink, ExpenseChartComponent],
  templateUrl: './expense-list-component.html',
  styleUrl: './expense-list-component.scss'
})
export class ExpenseListComponent {
  expenses: Expense[] = [];
  categories = Object.values(ExpenseCategory);
  selectedCategory: string | null = null;
  balance = 0;

  constructor(private expenseService: ExpenseService){}

  ngOnInit(): void{
    this.loadExpenses();
  }

  loadExpenses(): void{
    this.expenses = this.expenseService.getExpenses();
    this.balance = this.expenseService.getTotalExpenses();
  }

  onDelete(id: string): void{
    this.expenseService.deleteExpense(id);
    this.loadExpenses();
  }

  filterByCategory(category: string | null): void{
    this.selectedCategory = category;
    this.expenses = category
        ? this.expenseService.getExpenses().filter(e => e.category === category)
        : this.expenseService.getExpenses();    
  }

}
