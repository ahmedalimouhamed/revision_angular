import { Component, Input, Output, EventEmitter } from '@angular/core';
import {User} from '../../models/user';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm {
  @Input() set user(value: User | null){
    if(value){
      this.userForm.patchValue(value);
    }else{
      this.userForm.reset();
    }
  }
  @Output() save = new EventEmitter<Omit<User, 'id' | 'createdAt'>>();
  @Output() close = new EventEmitter<void>();

  roles = ['admin', 'moderator', 'user'];
  departments = ['IT', 'Sales', 'Marketing', 'HR', 'Finance'];
  statuses = ['active', 'inactive', 'pending'];

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    status: new FormControl('active', Validators.required),
    avatar: new FormControl<string | null>(null)
  });

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      if (formValue.name && formValue.email && formValue.role && formValue.department && formValue.status) {
        const userData: Omit<User, 'id' | 'createdAt'> = {
          name: formValue.name,
          email: formValue.email,
          role: formValue.role as 'admin' | 'moderator' | 'user',
          department: formValue.department,
          status: formValue.status as 'active' | 'inactive' | 'pending',
          avatar: formValue.avatar || undefined
        };
        this.save.emit(userData);
      }
    }
  }

  onClose(): void{
    this.close.emit();
  }
}
