import { Component } from '@angular/core';
import { User } from '../../models/user';
import { CustomIf } from '../../directives/custom-if';
import { CustomFor } from '../../directives/custom-for';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  imports: [
    CustomIf,
    CustomFor,
    UserCard
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList {

  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com'
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  ];

  selectedUser: User | null = null;

  onUserSelected(user: User){
    this.selectedUser = user;
    console.log('user selected : ', user);
  }

}
