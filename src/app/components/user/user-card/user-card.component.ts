import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../services/user.service';
import { Customer } from '../../../generated';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  imports: [MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  user?: Observable<Customer | null>;
  avatar?: string = "images/default-avatar.jpg";

  constructor(private userService: UserService) {
    this.downloadAvatar();
  }

  ngOnInit() {
    this.user = this.userService.user;
  }

  downloadAvatar() {
    this.userService.downloadAvatar().subscribe((url) => this.avatar = url);
  }

  fileSubmitted(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.userService.uploadAvatar(input.files.item(0)!).subscribe(() => this.downloadAvatar());
    }
  }

}
