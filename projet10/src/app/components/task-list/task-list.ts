import { Component, computed, signal, effect } from '@angular/core';
import { TaskService } from '../../services/task-service';
import {CommonModule} from '@angular/common';
import { StatsWidget } from '../stats-widget/stats-widget';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, StatsWidget, TaskForm],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  filter = signal<'all' | 'active' | 'completed'>('all');
  tasks = computed(() => this.taskService.getFilteredTasks(this.filter())());

  constructor(public taskService: TaskService){}

  handleFilterChange(newFilter: 'all' | 'active' | 'completed'): void{
    this.filter.set(newFilter);
  }
}
