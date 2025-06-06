import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent {
  @Input() isOpponent: boolean = false;
  
  // Temporary mock data for UI development
  cardsCount: number = 4;
  status: string = 'Thinking...';
}
