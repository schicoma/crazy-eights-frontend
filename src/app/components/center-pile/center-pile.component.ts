import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-center-pile',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './center-pile.component.html',
  styleUrls: ['./center-pile.component.scss']
})
export class CenterPileComponent {
  @Input() cards: Card[] = [];
  @Output() drawCard = new EventEmitter<void>();

  get topCard(): Card | undefined {
    return this.cards[this.cards.length - 1];
  }

  onDrawPileClick(): void {
    this.drawCard.emit();
  }
}
