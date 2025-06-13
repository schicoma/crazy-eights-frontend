import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent implements OnChanges {
  @Input() isOpponent: boolean = false;
  @Input() opponentCardsCount = 0;
  @Input() cards: Card[] = [];
  @Input() hasDrawnCard: boolean = true;

  @Output() playCard = new EventEmitter<Card>();
  @Output() pass = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpponent && changes['opponentCardsCount']) {
      this.updateOpponentCards();
    }
  }

  private updateOpponentCards(): void {
    this.cards = [];
    for (let i = 0; i < this.opponentCardsCount; i++) {
      this.cards.push({} as Card);
    }
  }

  selectCard(card: Card) {
    this.playCard.emit(card);
  }

  onPass() {
    this.pass.emit();
  }
}
