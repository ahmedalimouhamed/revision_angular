import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyMember } from './models/family-member';
import { FamilyTask } from './models/family-task';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFormComponent } from './components/task-form/task-form';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, TaskListComponent, TaskFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  familyMembers: FamilyMember[] = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Jane Doe',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 3,
      name: 'Mark Zuckerberg',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Elon Musk',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    }
  ];

  tasks: FamilyTask[] = [
    {id: 1, title: 'Faire la lessive', assignedTo: this.familyMembers[0], completed: false},
    {id: 2, title: 'Sortir les poubelles', assignedTo: this.familyMembers[1], completed: false},
    {id: 3, title: 'laver les linge', assignedTo: this.familyMembers[2], completed: false},
    {id: 4, title: 'faire le ménage', assignedTo: this.familyMembers[3], completed: false}
  ];

  selectedMemberId: number | null = null;

  onTaskAdded(newTaskTitle: string): void{
    console.log("from parent component <app-root>", newTaskTitle);
    const newTask: FamilyTask = {
      id: Date.now(),
      title: newTaskTitle,
      assignedTo: null,
      completed: false
    };

    this.tasks.push(newTask);
  }

  onTaskCompleted(taskId: number): void{
    console.log("from parent component <app-root>", taskId);
    const task = this.tasks.find(t => t.id === taskId);
    if(task) task.completed = !task.completed;
  }

  onMemberAssigned(event: {taskId: number, memberId: number}): void{
    console.log("from parent component <app-root>", event);
    const task = this.tasks.find(t => t.id === event.taskId);
    const member = this.familyMembers.find(m => m.id === event.memberId);
    if(task && member) task.assignedTo = member;
  }

  get filteredTasks(): FamilyTask[]{
    console.log("from parent component <app-root>", this.selectedMemberId);
    return this.selectedMemberId !== null && !isNaN(this.selectedMemberId)
      ? this.tasks.filter(t => t.assignedTo?.id === Number(this.selectedMemberId))
      : this.tasks;
  }

  protected readonly title = signal('projet8');
}
