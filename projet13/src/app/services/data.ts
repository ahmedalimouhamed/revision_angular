import { Injectable, signal } from '@angular/core';
import {User, UserFilters} from '../models/user';
import {BehaviorSubject, delay, map, Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class Data {
  private readonly STORAGE_KEY = 'admin_users';
  private usersSignal = signal<User[]>(this.loadUsers());

  private filtersSubject = new BehaviorSubject<UserFilters>({});
  filters$ = this.filtersSubject.asObservable();

  private loadUsers(): User[]{
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : this.generateSampleUsers();
  }

  private generateSampleUsers(): User[] {
    return [
      {
        id: crypto.randomUUID(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        department: 'IT',
        status: 'active',
        createdAt: new Date(),
        avatar: 'https://via.placeholder.com/150'
      },
      {
        id: crypto.randomUUID(),
        name: 'Mathieu',
        email: 'mathieu@example.com',
        role: 'admin',
        department: 'IT',
        status: 'active',
        createdAt: new Date(2024, 8, 20),
        avatar: 'https://via.placeholder.com/150'
      },
      {
        id: crypto.randomUUID(),
        name: 'Isabelle',
        email: 'isabelle@example.com',
        role: 'admin',
        department: 'IT',
        status: 'active',
        createdAt: new Date(2024, 1, 10),
        avatar: 'https://via.placeholder.com/150'
      }
    ]
  }

  getUsers(){
    //console.log(this.usersSignal());
    return this.usersSignal()
  }

  getFilteredUsers(): Observable<User[]>{
    return of(this.usersSignal()).pipe(
      delay(300),
      map((users: User[]) => {
        const filters = this.filtersSubject.value;
        return users.filter((user: User) => 
          (!filters.name || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.role || user.role === filters.role) &&
          (!filters.department || user.department.toLowerCase().includes(filters.department.toLowerCase())) &&
          (!filters.status || user.status === filters.status)
        )
      })
    )
  }

  addUser(user: Omit<User, 'id' | 'createdAt'>):void{
    const newUser: User = {
      ...user,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };

    const updatedUsers = [...this.usersSignal(), newUser];
    this.saveUsers(updatedUsers);
  }

  updateUser(id: string, updates: Partial<User>): void{
    const updatedUsers = this.usersSignal().map((user: User) => 
      user.id === id ? {...user, ...updates} : user
    );
    this.saveUsers(updatedUsers);
  }

  deleteUser(id: string):void{
    const updatedUsers = this.usersSignal().filter((user: User) => user.id !== id);
    this.saveUsers(updatedUsers);
  }

  setFilters(filters: UserFilters): void{
    this.filtersSubject.next(filters);
  }

  private saveUsers(users: User[]): void{
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    this.usersSignal.set(users);
  }
}
