// src/controller/gameController.ts
import { GameModel } from '../model/gameModel';
import { GameView } from '../view/gameView';
import * as PIXI from 'pixi.js';

export class GameController {
  private model: GameModel;
  private view: GameView;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;

    this.init();
  }

  private init(): void {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xde3249);
    graphics.drawRect(50, 50, 100, 100);
    graphics.endFill();
    this.view.app.stage.addChild(graphics);
  }
}
