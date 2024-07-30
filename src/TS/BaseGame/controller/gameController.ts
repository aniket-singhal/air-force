// src/controller/gameController.ts
import { GameModel } from '../model/gameModel';
import { GameView } from '../view/gameView';
import * as PIXI from 'pixi.js'

export class GameController {
  private model: GameModel;
  private view: GameView;
  private plane: PIXI.Sprite | undefined;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.initialize();
  }

  private initialize(): void {
    this.view.onAssetsLoaded = () => {
      this.plane = this.view.showImage('plane');
      this.setupKeyboardControls();
    };
  }
  private setupKeyboardControls(): void {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (!this.plane) return;

    switch (event.key) {
      case 'ArrowLeft':
        if(this.plane.x>0)
        this.plane.x -= 10;
        break;
      case 'ArrowRight':
        if(this.plane.x<410)
        this.plane.x += 10;
        break;
    }
}
}