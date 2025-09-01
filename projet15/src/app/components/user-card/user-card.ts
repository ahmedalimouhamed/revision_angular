import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss'
})
export class UserCard {

  @Input() user: User | null = null;
  @Output() userSelected = new EventEmitter<User>();

  onSelect(){
    if(this.user){
      this.userSelected.emit(this.user);
    }
  }

}
