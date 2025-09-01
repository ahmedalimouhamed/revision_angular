import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  imports: [CommonModule],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss'
})
export class UserAvatar {
  @Input() user: User | null = null;
  @Input() size: number = 40;

  getInitials(name: string | undefined): string{
    if(!name) return '';
    return name
      .split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
