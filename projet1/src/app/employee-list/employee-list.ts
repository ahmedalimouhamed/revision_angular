import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee, EmployeeService } from '../employee';
import { EmployeeForm } from '../employee-form/employee-form';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule, EmployeeForm],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss']
})
export class EmployeeList implements OnInit{
  employees : Employee[]= [];
  searchItem = '';
  editingEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void{
    this.employees = this.employeeService.getEmployees();
  }

  get filteredEmployees(): Employee[]{
    return this.employees.filter(emp => 
      emp.name.toLowerCase().includes(this.searchItem.toLowerCase()) ||
      emp.department.toLowerCase().includes(this.searchItem.toLowerCase())
    )
  }

  editEmployee(employee: Employee): void{
    this.editingEmployee = {...employee};
  }

  deleteEmployee(id: number): void{
    if(confirm('Are you sure you want to delete this employee?')){
      this.employeeService.deleteEmployee(id);
      this.loadEmployees();
    }
  }

  handleSubmit(employee: Employee): void{
    if(employee.id) {
      this.employeeService.updateEmployee(employee.id, employee);
    }else{
      this.employeeService.addEmployee(employee);
    }
    this.editingEmployee = null;
    this.loadEmployees();
  }

  addNewEmployee(): void {
    this.editingEmployee = {
      id: 0, // L'ID sera généré par le service
      name: '',
      email: '',
      phone: '',
      department: ''
    };
  }
}
