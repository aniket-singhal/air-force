// src/controller/gameController.ts
import { GameModel } from '../model/gameModel';
import { GameView } from '../view/gameView';
import * as PIXI from 'pixi.js';
import { Ticker } from '@pixi/ticker';

export class GameController {
  private model: GameModel;
  private view: GameView;
  private ticker: Ticker;
  private plane: PIXI.Sprite | undefined;
  private bgImage: any;
  private bgImage2: any;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.initialize();
    // Create a new ticker instance
    this.ticker = new Ticker();

    // // Add the update method to the ticker
    // this.ticker.add(this.update, this);

    // // Start the ticker
    // this.ticker.start();
  }

  private initialize(): void {
    this.view.onAssetsLoaded = () => {
      this.ticker.add(this.update, this);
      this.ticker.start();
      this.bgImage = this.view.showImage('space');
      this.bgImage2 = this.view.showImage('space2');
      this.plane = this.view.showImage('plane');
      this.setupKeyboardControls();
      // Add the update method to the ticker

      // Start the ticker
    };
  }
  private update(delta: number): void {
    // // Move the background down along the Y-axis
    // const bgImage:any = this.view.showImage('space');
    // const bgImage2:any = this.view.showImage('space2');
    if (this.bgImage && this.bgImage2) {
      this.bgImage.y += 2 * delta;
      this.bgImage2.y += 2 * delta;
    // If the image goes off the screen, reset its position
    if (this.bgImage.y >= 1088) {
      this.bgImage.y = -350;
    }
    if (this.bgImage2.y >= 1088) {
      this.bgImage2.y = -350;
    }
  }
  }
  private setupKeyboardControls(): void {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (!this.plane) return;

    switch (event.key) {
      case 'ArrowLeft':
        if (this.plane.x > 0)
          this.plane.x -= 10;
        break;
      case 'ArrowRight':
        if (this.plane.x < 410)
          this.plane.x += 10;
        break;
      case 'ArrowUp':
        this.plane.y -= 10;
        break;
      case 'ArrowDown':
        this.plane.y += 10;
        break;
    }
  }
}