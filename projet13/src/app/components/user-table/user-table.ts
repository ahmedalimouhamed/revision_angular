import { Component, Input, Output, EventEmitter } from '@angular/core';
import {User} from '../../models/user';
import { CommonModule } from '@angular/common';
import { ConfirmDelete } from '../../directives/confirm-delete';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, ConfirmDelete],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})
export class UserTable {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<string>();
  
  onEdit(user: User): void{
    this.editUser.emit(user);
  }

  onDelete(userId: string): void{
    this.deleteUser.emit(userId);
  }

  getStatusClass(status: string): string{
    return `status-${status}`;
  }
}
