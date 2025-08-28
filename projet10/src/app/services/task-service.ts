import { Injectable, signal, computed, effect } from '@angular/core';
import {Task} from '../models/task-model';
import {localStorageUtil} from '../utils/StorageUtil';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks = signal<Task[]>(this.loadFromStorage());

  completedCount = computed(() => this.tasks().filter((task: Task) => 
    task.completed).length
  );

  pendingCount = computed(() => 
    this.tasks().filter((task: Task) => !task.completed).length
  )

  constructor(){
    effect(() =>{
      localStorageUtil.save('tasks', this.tasks());
    });
  }

  private loadFromStorage(): Task[] {
    return localStorageUtil.load<Task[]>('tasks') || [];
  }

  addTask(title: string): void{
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date()
    }
    this.tasks.update((tasks: Task[]) => [...tasks, newTask]);
  }

  toggleTask(id: string): void{
    this.tasks.update((tasks: Task[]) => 
      tasks.map((task: Task) => 
        task.id === id ? {...task, completed: !task.completed} : task
      )
    )
  }

  deleteTask(id: string): void{
    this.tasks.update((tasks:Task[]) =>tasks.filter((task:Task) => task.id !== id));
  }

  getFilteredTasks(filter: 'all' | 'active' | 'completed'){
    return computed(() => {
      switch(filter){
        case 'active': return this.tasks().filter((task: Task) => !task.completed);
        case 'completed': return this.tasks().filter((task: Task) => task.completed);
        default: return this.tasks();
      }
    })
  }
  
}
