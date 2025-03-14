import { Component } from '@angular/core';
import { UserCardComponent } from "../../user/user-card/user-card.component";

@Component({
  selector: 'app-dashboard-profile',
  imports: [UserCardComponent],
  templateUrl: './dashboard-profile.component.html',
  styleUrl: './dashboard-profile.component.scss'
})
export class DashboardProfileComponent {

}
