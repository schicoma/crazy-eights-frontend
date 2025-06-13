import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Suit } from '../../models/card.model';

@Component({
  selector: 'app-suit-selector-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-content">
        <h2>Select a Suit</h2>
        <div class="suits-container">
          <button 
            *ngFor="let suit of suits" 
            class="suit-button"
            (click)="onSuitSelect(suit)"
          >
            {{ getSuitSymbol(suit) }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;

      h2 {
        margin-bottom: 1.5rem;
        color: #333;
      }
    }

    .suits-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .suit-button {
      font-size: 2rem;
      padding: 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class SuitSelectorModalComponent {
  @Output() suitSelected = new EventEmitter<Suit>();
  @Output() close = new EventEmitter<void>();

  suits = Object.values(Suit);

  getSuitSymbol(suit: Suit): string {
    switch (suit) {
      case Suit.HEARTS: return '♥';
      case Suit.DIAMONDS: return '♦';
      case Suit.CLUBS: return '♣';
      case Suit.SPADES: return '♠';
    }
  }

  onSuitSelect(suit: Suit): void {
    this.suitSelected.emit(suit);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }
} 