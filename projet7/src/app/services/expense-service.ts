import { Injectable } from '@angular/core';
import {Expense} from '../models/expense';
import { ExpenseCategory } from '../models/expense-category';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly STORAGE_KEY = 'expenses';

  constructor() { }

  getExpenses(): Expense[]{
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data? JSON.parse(data): [];
  }

  addExpense(expense: Omit<Expense, 'id'>):void{
    console.log(expense);
    const expenses = this.getExpenses();
    expenses.push({...expense, id: uuidv4()})
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
    console.log(this.getExpenses());
  }

  deleteExpense(id: string): void{
    const expenses = this.getExpenses().filter(e => e.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
  }

  getTotalExpenses(): number{
    return this.getExpenses().reduce((sum, expense) => sum + expense.amount, 0);
  }

  getExpensesByCategory():{category: string; total: number}[]{
    const expenses = this.getExpenses();
    const categories = Object.values(ExpenseCategory);
    return categories.map(category => ({
      category,
      total:expenses
          .filter(e => e.category === category)
          .reduce((sum, e) => sum + e.amount, 0)
    }))
  }
  
}
