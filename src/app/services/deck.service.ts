import { Injectable } from '@angular/core';
import { Card, Suit, Value } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deck: Card[] = [];

  constructor() {
  }


} 