import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() value: string = '';
  @Input() suit: string = '';
  @Input() isClickable: boolean = true;
  @Input() isFaceDown: boolean = false;
  @Input() isPlayable: boolean = false;
  @Input() label: string | undefined

  get suitIcon(): string {
    switch (this.suit) {
      case 'hearts':
        return '♥';
      case 'diamonds':
        return '♦';
      case 'clubs':
        return '♣';
      case 'spades':
        return '♠';
      default:
        return '';
    }
  }

  get suitColor(): string {
    return this.suit === 'hearts' || this.suit === 'diamonds' ? 'red' : 'black';
  }
}
