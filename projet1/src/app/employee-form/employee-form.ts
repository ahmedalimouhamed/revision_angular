import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.scss']
})
export class EmployeeForm {
  @Input() employee: Employee | null = null;
  @Output() submitEvent = new EventEmitter<Employee>();

  departments = ['HR', 'IT', 'Engineering', 'Marketing', 'Finance'];

  onSubmit(form: NgForm){
    //console.log(form.value);
    if(form.valid){
      console.log(form.value);
      this.submitEvent.emit({
        id: this.employee?.id || 0,
        ...form.value
      })
      form.reset();
    }
  }

}
