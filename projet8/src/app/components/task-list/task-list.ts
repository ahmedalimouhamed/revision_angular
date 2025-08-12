import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FamilyMember } from '../../models/family-member';
import { FamilyTask } from '../../models/family-task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit{
  @Input() tasks: FamilyTask[] = [];
  @Input() members: FamilyMember[] = [];

  @Output() taskCompleted = new EventEmitter<number>();
  @Output() memberAssigned = new EventEmitter<{taskId: number, memberId: number}>();


  ngOnInit(): void {
    console.log("from child component <task-list-ts> ", this.tasks, this.members);
  }

  onAssignMember(taskId: number, event: Event): void{
    console.log("from child component <task-list-ts> ", taskId, event);
    const memberId = +(event.target as HTMLSelectElement).value;
    this.memberAssigned.emit({taskId, memberId});
  }
}
