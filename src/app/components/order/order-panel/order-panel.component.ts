import { Component, Input } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { CustomerOrder } from '../../../generated';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderStatePipe } from '../../../pipes/order-state.pipe';
import { MatListModule } from '@angular/material/list';
import { OrderLineComponent } from '../order-line/order-line.component';

@Component({
  selector: 'app-order-panel',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    DatePipe,
    OrderStatePipe,
    CommonModule,
    MatListModule,
    OrderLineComponent
  ],
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.scss'
})
export class OrderPanelComponent {

  @Input() order?: CustomerOrder;

}
