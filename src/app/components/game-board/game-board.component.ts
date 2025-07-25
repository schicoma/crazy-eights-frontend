import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card, Suit, Value } from '../../models/card.model';
import { GameState } from '../../models/gameState.model';
import { DeckService } from '../../services/deck.service';
import { GameService } from '../../services/game.service';
import { CenterPileComponent } from '../center-pile/center-pile.component';
import { GameOptionsModalComponent } from '../game-options-modal/game-options-modal.component';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { PlayerHandComponent } from '../player-hand/player-hand.component';
import { PlayerInfoComponent } from '../player-info/player-info.component';
import { SuitSelectorModalComponent } from '../suit-selector-modal/suit-selector-modal.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule,
    PlayerHandComponent,
    PlayerInfoComponent,
    CenterPileComponent,
    SuitSelectorModalComponent,
    GameOptionsModalComponent,
    GameOverModalComponent
  ],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  public topCard: Card | null = null;
  public centerPile: Card[] = [];
  public playerHand: Card[] = [];
  public opponentCardsCount: number = 0;
  public showSuitSelector = false;
  public suitSelected: Suit | null = null;
  public showGameOptions = true;
  public currentGameId: string | null = null;
  public isLoading = false;
  public isMyTurn = false;
  public hasDrawnCard = false;
  public showGameOver = false;
  public isWinner = false;
  public currentDrawPenalty = 0;
  public notification: string | null = null

  private cardPlayed: Card | null = null;

  constructor(private deckService: DeckService, private gameService: GameService) { }

  ngOnInit(): void {

    this.gameService.onNotifications().subscribe(data => {
      this.notification = data.message

      setTimeout(() => {
        this.notification = null
      }, 10000)
    })

    // if (true) {
    //   this.showGameOptions = false
    //   this.topCard = { suit: Suit.CLUBS, value: Value.ACE, isPlayable: false }
    //   this.opponentCardsCount = 8
    //   this.playerHand = [
    //     { suit: Suit.DIAMONDS, value: Value.ACE, isPlayable: false },
    //     { suit: Suit.SPADES, value: Value.JACK, isPlayable: false },
    //     { suit: Suit.CLUBS, value: Value.EIGHT, isPlayable: false },
    //     { suit: Suit.HEARTS, value: Value.ACE, isPlayable: false },
    //     { suit: Suit.HEARTS, value: Value.ACE, isPlayable: false },
    //     { suit: Suit.HEARTS, value: Value.ACE, isPlayable: false },
    //     { suit: Suit.HEARTS, value: Value.KING, isPlayable: false },
    //   ]
    //   return
    // }
    // Listen for game updates
    this.gameService.onGameUpdate().subscribe(data => {
      console.log('Game update:', data);

      switch (data.type) {
        case 'opponentJoined':
          this.showGameOptions = false;
          this.isLoading = false;
          this.updateGameState(data.gameState, data.type);
          break;

        case 'cardPlayed':
          this.updateGameState(data.gameState, data.type);
          break;

        case 'cardDrawn':
          this.updateGameState(data.gameState, data.type);
          break;

        case 'pass':
          this.updateGameState(data.gameState, data.type);
          break;

        case 'gameStarted':
          this.updateGameState(data.gameState, data.type);
          break;
      }

    });
  }

  private updateGameState(gameState: GameState, type?: string): void {
    if (!gameState) {
      return
    }

    this.opponentCardsCount = gameState.opponentCardCount;
    this.playerHand = gameState.yourHand;
    this.topCard = gameState.topCard;
    this.isMyTurn = gameState.isMyTurn
    this.currentDrawPenalty = gameState.currentDrawPenalty

    if (type !== 'cardDrawn') {
      this.hasDrawnCard = false
    }

    if (gameState.status === 'finished') {
      this.showGameOver = true
      this.isWinner = this.playerHand.length === 0
    }
  }

  onCreateGame(): void {
    this.isLoading = true;
    this.gameService.createGame().subscribe(data => {
      console.log('Game created:', data);
      this.currentGameId = data.gameId;

      // localStorage.setItem('crazyEightsGameId', data.gameId);
      // localStorage.setItem('crazyEightsPlayerId', socket.id); // or a custom player token
    });
  }

  onJoinGame(gameId: string): void {
    this.isLoading = true;
    this.gameService.joinGame(gameId).subscribe(data => {
      this.currentGameId = gameId;
      this.showGameOptions = false;
      this.isLoading = false;
      this.updateGameState(data.gameState);
    });
  }

  drawCard() {
    if (!this.currentGameId || !this.isMyTurn) {
      alert("Not your turn")
      return;
    }

    if (this.hasDrawnCard) {
      alert("You can only draw one card in your turn")
      return
    }

    this.hasDrawnCard = true
    this.gameService.drawCard(this.currentGameId).subscribe((data) => {
      this.updateGameState(data.gameState);
    });
  }

  playCard(card: Card): void {
    if (!this.currentGameId || !this.isMyTurn) {
      alert("Not your turn")
      return;
    }

    this.cardPlayed = card

    // If an 8 was played, show the suit selector
    if (card.value === Value.EIGHT) {
      this.showSuitSelector = true;
      return
    }

    this.gameService.playCard({ gameId: this.currentGameId, card }).subscribe((data) => {
      this.updateGameState(data.gameState);
    });
  }

  onPass(): void {
    if (!this.currentGameId || !this.hasDrawnCard) {
      return;
    }

    this.gameService.pass(this.currentGameId).subscribe((data) => {
      console.log('Turn passed:', data);
      this.updateGameState(data.gameState);
      this.hasDrawnCard = false;
    });
  }

  onSuitSelected(suit: Suit): void {
    this.showSuitSelector = false;
    this.suitSelected = suit;

    this.gameService.playCard({
      gameId: this.currentGameId, card: this.cardPlayed,
      suiteChanged: suit
    }).subscribe((data) => {
      this.updateGameState(data.gameState);
    });
  }

  onNewGame() {
    this.showGameOver = false;
    this.showGameOptions = true;
  }
}
