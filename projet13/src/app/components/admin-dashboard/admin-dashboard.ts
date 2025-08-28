import { Component, inject, signal } from '@angular/core';
import { Data } from '../../services/data';
import {User, UserFilters} from '../../models/user';
import {UserTable} from '../user-table/user-table';
import {UserForm} from '../user-form/user-form';
import {StatCards} from '../stat-cards/stat-cards';
import { FilterPipe } from '../../pipes/filter-pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe,
    UserTable,
    UserForm,
    StatCards
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  dataService = inject(Data);
  showModal = signal(false);
  editingUser = signal<User | null>(null);
  filters = signal<UserFilters>({});
  users = this.dataService.getFilteredUsers();

  openAddModal(): void{
    this.editingUser.set(null);
    this.showModal.set(true);
  }

  openEditModal(user: User):void{
    this.editingUser.set(user);
    this.showModal.set(true);
  }

  closeModal(): void{
    this.showModal.set(false);
    this.editingUser.set(null);
  }

  handleUserSave(userData: Partial<User>): void{
    if(this.editingUser()){
      this.dataService.updateUser(this.editingUser()!.id, userData);
    }else{
      // Ensure all required fields are present when adding a new user
      const newUser: Omit<User, 'id' | 'createdAt'> = {
        name: userData.name!,
        email: userData.email!,
        role: userData.role!,
        department: userData.department!,
        status: userData.status!,
        lastLogin: userData.lastLogin,
        avatar: userData.avatar
      };
      this.dataService.addUser(newUser);
    }
    this.closeModal();
  }

  updateFilters(): void{
    this.dataService.setFilters(this.filters());
  }
}
