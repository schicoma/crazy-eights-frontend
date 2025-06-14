import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardComponent } from '../card/card.component';

const MAX_LIMIT_OPPONENT_CARDS_FOR_MOBILE = 7

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CommonModule, CardComponent, CdkDropList, CdkDrag],
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss'],
})
export class PlayerHandComponent implements OnChanges {
  @Input() isOpponent: boolean = false;
  @Input() opponentCardsCount = 0;
  @Input() cards: Card[] = [];
  @Input() hasDrawnCard: boolean = true;

  @Output() playCard = new EventEmitter<Card>();
  @Output() pass = new EventEmitter<void>();

  public opponentCardsLabel: string | null = null

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpponent && changes['opponentCardsCount']) {
      this.updateOpponentCards();
    }
  }

  private updateOpponentCards(): void {
    this.cards = [];

    if (this.opponentCardsCount <= MAX_LIMIT_OPPONENT_CARDS_FOR_MOBILE) {
      for (let i = 1; i <= this.opponentCardsCount; i++) {
        this.cards.push({} as Card);
      }
      this.opponentCardsLabel = null
    } else {
      for (let i = 1; i <= MAX_LIMIT_OPPONENT_CARDS_FOR_MOBILE - 1; i++) {
        this.cards.push({} as Card);
      }
      this.opponentCardsLabel = `+${this.opponentCardsCount - (MAX_LIMIT_OPPONENT_CARDS_FOR_MOBILE - 1)}`
    }
  }

  selectCard(card: Card) {
    this.playCard.emit(card);
  }

  onPass() {
    this.pass.emit();
  }

  drop(event: CdkDragDrop<Card[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }
}