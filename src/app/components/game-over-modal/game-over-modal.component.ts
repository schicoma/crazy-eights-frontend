import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

// <button class="new-game-button" (click)="onNewGame()">New Game</button>
@Component({
  selector: 'app-game-over-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>{{ isWinner ? '🎉 You Won! 🎉' : 'Game Over' }}</h2>
        <p>{{ isWinner ? 'Congratulations!' : 'Better luck next time!' }}</p>
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
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      max-width: 90%;
      width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 2rem;
      }
    }

    .new-game-button {
      background: #3498db;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #2980b9;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class GameOverModalComponent {
  @Input() isWinner: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() newGame = new EventEmitter<void>();

  ngOnInit() {
    if (this.isWinner) {
      this.throwConfetti();
    }
  }

  onClose() {
    this.close.emit();
  }

  onNewGame() {
    this.newGame.emit();
  }

  private throwConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }
} 