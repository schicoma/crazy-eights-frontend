import { Injectable } from '@angular/core';
import { Card, Suit, Value } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deck: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  private initializeDeck(): void {
    this.deck = [];
    Object.values(Suit).forEach(suit => {
      Object.values(Value).forEach(value => {
        this.deck.push({ suit, value, isPlayable: true });
      });
    });
  }

  public shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  public getDeck(): Card[] {
    return [...this.deck];
  }

  public resetDeck(): void {
    this.initializeDeck();
    this.shuffleDeck();
  }
} 