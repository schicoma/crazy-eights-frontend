import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { GameJoinedMessage, GameUpdateMessage } from '../models/gameState.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private socket: Socket;

  constructor() {
    // Conecta al servidor (ajusta la URL según tu servidor)
    this.socket = io('http://localhost:3000');
    console.log(this.socket.id)
  }

  // Método para crear una partida
  createGame(): Observable<{ gameId: string }> {
    return new Observable(observer => {
      this.socket.emit('createGame');
      this.socket.once('gameCreated', (data) => observer.next(data));
    });
  }

  // Método para unirse a una partida
  joinGame(gameId: string): Observable<GameJoinedMessage> {
    return new Observable(observer => {
      this.socket.emit('joinGame', gameId);
      this.socket.once('gameJoined', (data) => observer.next(data));
    });
  }

  // Método para jugar una carta
  playCard(params: any): Observable<any> {
    return new Observable(observer => {
      this.socket.emit('playCard', params);
      this.socket.once('cardPlayed', (response) => observer.next(response));
    });
  }

  drawCard(gameId: string): Observable<any> {
    return new Observable(observer => {
      this.socket.emit('drawCard', gameId);
      this.socket.once('cardDrawn', (data) => observer.next(data));
    });
  }

  pass(gameId: string): Observable<any> {
    return new Observable(observer => {
      this.socket.emit('pass', gameId);
      this.socket.once('turnPassed', (data) => observer.next(data));
    });
  }

  // Método para escuchar actualizaciones del juego
  onGameUpdate(): Observable<GameUpdateMessage> {
    return new Observable(observer => {
      this.socket.on('updateGameState', (data) => {
        observer.next(data);
      });
    });
  }
}
