import { Component, Input } from '@angular/core';
import { Indicator } from '../../core/models/interfaces/indicator.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() error!: string;
  @Input() title!: string;
  @Input() indicators: Indicator[]|null = [];
}