import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  newTaskTitle = '';

  constructor(public taskService: TaskService){}

  onSubmit(): void{
    if(this.newTaskTitle.trim()){
      this.taskService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
    }
  }
}
