import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent {
  @Input() isOpponent: boolean = false;
  @Input() cardsCount: number = 0;
  @Input() status: string = 'false'

}
