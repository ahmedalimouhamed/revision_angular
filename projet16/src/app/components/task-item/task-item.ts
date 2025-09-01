import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { PriorityHighlight } from '../../directives/priority-highlight';
import { TaskTooltip } from '../../directives/task-tooltip';
import { DragDrop } from '../../directives/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [
    CommonModule,
    PriorityHighlight,
    TaskTooltip,
    DragDrop
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss'
})
export class TaskItem {
  @Input() task: Task | null = null;
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Task>();

  onToggleComplete(){
    if(this.task){
      this.toggleComplete.emit(this.task.id);
    }
  }

  onDelete(){
    if(this.task){
      this.delete.emit(this.task.id);
    }
  }

  onEdit(){
    if(this.task){
      this.edit.emit(this.task);
    }
  }
}
