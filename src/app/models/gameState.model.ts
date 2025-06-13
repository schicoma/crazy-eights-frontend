import { Card } from "./card.model"

export interface GameUpdateMessage {
    type: string
    gameId: string
    gameState: GameState
}

export interface GameJoinedMessage {
    gameId: string
    gameState: GameState
}

export interface GameState {
    currentTurn: string
    opponentCardCount: number
    topCard: Card
    yourHand: Card[]
    isMyTurn: boolean
    status: 'finished' | 'playing' | 'waiting'
    currentDrawPenalty: number
}