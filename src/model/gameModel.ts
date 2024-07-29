// src/model/gameModel.ts
export class GameModel {
    private score: number;
  
    constructor() {
      this.score = 0;
    }
  
    public getScore(): number {
      return this.score;
    }
  
    public setScore(score: number): void {
      this.score = score;
    }
  }
  