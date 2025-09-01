import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../services/task-service';
import {TaskForm} from '../task-form/task-form';
import {TaskItem} from '../task-item/task-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    TaskForm,
    TaskItem
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  onToggleComplete(taskId: number){
    this.taskService.toggleTaskCompletion(taskId);
  }

  onDeleteTask(task: number){
    this.taskService.deleteTask(task);
    this.tasks = this.taskService.getTasks();
  }

  onEditTask(task: Task){
    this.editingTask = {...task};
  }

  onUpdateTask(updatedTask: Task){
    this.taskService.updateTask(updatedTask);
    this.tasks = this.taskService.getTasks();
    this.editingTask = null;
  }

  onAddTask(task: Omit<Task, 'id'>){
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks();
  }

  cancelEdit(){
    this.editingTask = null;
  }
}
