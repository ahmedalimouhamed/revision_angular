import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskFormComponent {

  @Output() taskAdded = new EventEmitter<string>();
  newTaskTitle: string = '';

  onSubmit(): void{
    if(this.newTaskTitle.trim()){
      this.taskAdded.emit(this.newTaskTitle);
      this.newTaskTitle = '';
    }
  }

}
