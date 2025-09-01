import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task';
import { SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnChanges {
  @Input() editingTask: Task | null = null;
  @Output() submitTask = new EventEmitter<Omit<Task, 'id'>>();
  @Output() updateTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';
  priority: 'low' | 'medium' | 'high' = 'medium';
  dueDate: string = '';

  isEditing = false;

  ngOnChanges(changes: SimpleChanges){
    if(changes['editingTask'] && this.editingTask){
      this.isEditing = true;
      this.title = this.editingTask.title;
      this.description = this.editingTask.description;
      this.priority = this.editingTask.priority;
      this.dueDate = this.editingTask.dueDate ? new Date(this.editingTask.dueDate).toISOString().split('T')[0] : '';
    }else{
      this.resetForm();
    }
  }

  onSubmit(){
    const taskData = {
      title: this.title,
      description: this.description,
      completed: false,
      priority: this.priority,
      dueDate: this.dueDate ? new Date(this.dueDate) : undefined
    };

    if(this.isEditing && this.editingTask){
      this.updateTask.emit({
        ...this.editingTask,
        ...taskData
      })
    }else{
      this.submitTask.emit(taskData);
    }

    this.resetForm();
  }

  onCancel(){
    this.cancel.emit();
    this.resetForm();
  }
  
  resetForm(){
    this.title = '';
    this.description = '';
    this.priority = 'medium';
    this.dueDate = '';
    this.isEditing = false;
    this.editingTask = null;
  }
}
