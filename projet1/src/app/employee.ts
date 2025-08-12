import { Injectable } from '@angular/core';

export interface Employee{
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';

  constructor(){}

  getEmployees(): Employee[]{
    const employees = localStorage.getItem(this.STORAGE_KEY);
    return employees ? JSON.parse(employees): []
  }

  addEmployee(employee: Omit<Employee, 'id'>): void{
    const employees = this.getEmployees();
    const newEmployee = {
      ...employee,
      id: this.generateId(),
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...employees, newEmployee]));
  }

  updateEmployee(id: number, employee: Omit<Employee, 'id'>): void{
    const employees = this.getEmployees();
    const index = employees.findIndex(e => e.id === id);
    if(index !== -1){
      employees[index] = {...employee, id};
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
    }
  }

  deleteEmployee(id: number): void{
    const employees = this.getEmployees().filter(e => e.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  }

  private generateId(): number{
    const employees = this.getEmployees();
    return employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
  }
  
}
