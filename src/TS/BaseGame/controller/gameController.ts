// src/controller/gameController.ts
import { GameModel } from '../model/gameModel';
import { GameView } from '../view/gameView';

export class GameController {
  private model: GameModel;
  private view: GameView;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.init();
  }

  private init(): void {
    this.view.showImage("plane");
  }
}
