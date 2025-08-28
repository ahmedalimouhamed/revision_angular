import { Pipe, PipeTransform } from '@angular/core';
import {User, UserFilters} from '../models/user';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(users: User[], filters: UserFilters): User[] {
    if(!users || !filters) return users;

    return users.filter((user: User) => {
      return (
        (!filters.name || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.role || user.role === filters.role) &&
        (!filters.department || user.department.toLowerCase().includes(filters.department.toLowerCase())) &&
        (!filters.status || user.status === filters.status)
      )
    })
  }

}
