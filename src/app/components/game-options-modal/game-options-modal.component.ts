import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-options-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Welcome to Crazy Eights!</h2>
        
        <div *ngIf="!gameId">
          <div class="options">
            <button (click)="onCreateGame()" [disabled]="isLoading">Create New Game</button>
            <div class="join-game">
              <input 
                type="text" 
                [(ngModel)]="gameIdToJoin" 
                placeholder="Enter Game ID"
                [disabled]="isLoading"
              >
              <button (click)="onJoinGame()" [disabled]="isLoading || !gameIdToJoin">Join Game</button>
            </div>
          </div>
        </div>

        <div *ngIf="gameId" class="waiting-room">
          <p>Waiting for opponent to join...</p>
          <div class="game-id">
            <p>Share this Game ID:</p>
            <div class="id-display">
              <span>{{ gameId }}</span>
              <button (click)="copyGameId()">Copy</button>
            </div>
          </div>
          <div class="loading-spinner"></div>
        </div>

        <div *ngIf="error" class="error">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      text-align: center;
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    button {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 4px;
      background: #3498db;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s;
    }

    button:hover:not(:disabled) {
      background: #2980b9;
    }

    button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .join-game {
      display: flex;
      gap: 0.5rem;
    }

    input {
      flex: 1;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .waiting-room {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .game-id {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      width: 100%;
    }

    .id-display {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .id-display span {
      font-family: monospace;
      font-size: 1.2rem;
      padding: 0.5rem;
      background: #e9ecef;
      border-radius: 4px;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error {
      color: #e74c3c;
      margin-top: 1rem;
    }
  `]
})
export class GameOptionsModalComponent {
  @Input() gameId: string | null = null;
  @Input() isLoading = false;
  @Output() createGame = new EventEmitter<void>();
  @Output() joinGame = new EventEmitter<string>();

  gameIdToJoin = '';
  error = '';

  onCreateGame(): void {
    this.isLoading = true;
    this.error = '';
    this.createGame.emit();
  }

  onJoinGame(): void {
    if (!this.gameIdToJoin) {
      this.error = 'Please enter a game ID';
      return;
    }
    this.isLoading = true;
    this.error = '';
    this.joinGame.emit(this.gameIdToJoin);
  }

  copyGameId(): void {
    if (this.gameId) {
      navigator.clipboard.writeText(this.gameId);
    }
  }
} 