import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(){
    this.tasks = [
      {
        id: this.nextId++,
        title: 'Apprendre angular',
        description: 'comprendre des derictives et les components',
        completed: false,
        priority: 'high'
      },
      {
        id: this.nextId++,
        title: 'Créer un projet angular',
        description: 'mettre en pratique les connaissances acquises',
        completed: false,
        priority: 'medium'
      },
      {
        id: this.nextId++,
        title: 'Tester l\'application',
        description: 'érifier que tout fonctionne correctement',
        completed: false,
        priority: 'low'
      },
    ]
  }

  getTasks(): Task[]{
    return this.tasks;
  }

  addTask(task: Omit<Task, 'id'>): Task{
    const newTask: Task = {
      id: this.nextId++,
      ...task
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(updatedTask: Task): void{
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if(index !== -1){
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(id: number): void{
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  toggleTaskCompletion(id: number): void{
    const task = this.tasks.find(t => t.id === id);
    if(task){
      task.completed = !task.completed;
    }
  }
}
