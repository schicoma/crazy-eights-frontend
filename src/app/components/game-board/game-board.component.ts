import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerHandComponent } from '../player-hand/player-hand.component';
import { PlayerInfoComponent } from '../player-info/player-info.component';
import { CenterPileComponent } from '../center-pile/center-pile.component';
import { DeckService } from '../../services/deck.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule,
    PlayerHandComponent,
    PlayerInfoComponent,
    CenterPileComponent
  ],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  private deck: Card[] = [];
  public centerPile: Card[] = [];
  public playerHand: Card[] = [];
  public computerHand: Card[] = [];

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    // Reset and shuffle the deck
    this.deckService.resetDeck();
    this.deck = this.deckService.getDeck();

    console.log(this.deck);

    // Deal initial cards (7 cards each for Crazy Eights)
    this.playerHand = this.deck.splice(0, 7);
    this.computerHand = this.deck.splice(0, 7);

    // Place first card in center pile
    this.centerPile = [this.deck.splice(0, 1)[0]];
  }

  drawCard() {
    let cardDrawn = undefined
    if (this.deck.length === 0) {
      // If deck is empty, shuffle the center pile (except top card) back into the deck
      // const topCard = this.centerPile.pop();
      // if (topCard) {
      //   this.deck = [...this.centerPile];
      //   this.centerPile = [topCard];
      //   this.deckService.shuffleDeck();
      // }
    }
    cardDrawn = this.deck.splice(0, 1)[0];

    // add drawn card to the player's hand
    this.playerHand.push(cardDrawn);
  }
}
