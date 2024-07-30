// src/view/gameView.ts
import * as PIXI from 'pixi.js';
import { gameConfig } from '../../../gameConfig';
import { AssetLoader } from '../Loader';


export class GameView {
  public app: PIXI.Application;
  private desiredAspectRatio: number;
  private assetLoader: AssetLoader;

  constructor(assetLoader: AssetLoader) {
    this.assetLoader = assetLoader;
    this.desiredAspectRatio = gameConfig.desiredAspectRatio;;
    this.app = new PIXI.Application({
      width: gameConfig.gameWidth,
      height: gameConfig.gameHeight,
      backgroundColor: gameConfig.backgroundColor,
    });
    document.body.appendChild(this.app.view as any);

    // Apply CSS styles to center the canvas
    const canvasStyle = this.app.view.style as any;
    canvasStyle.display = 'block';
    canvasStyle.marginLeft = 'auto';
    canvasStyle.marginRight = 'auto';

    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize(); // Call initially to set the correct size
  }

  public onResize(): void {
    const screenWidth = gameConfig.gameWidth;
    const screenHeight = gameConfig.gameHeight;
    const screenRatio = screenWidth / screenHeight;

    if (screenRatio >= this.desiredAspectRatio) {
      const newWidth = screenHeight * this.desiredAspectRatio;
      this.app.renderer.resize(newWidth, screenHeight);
      const canvasStyle = this.app.view.style as any;
      canvasStyle.width = `${newWidth}px`;
      canvasStyle.height = `${screenHeight}px`;
    } else {
      const newHeight = screenWidth / this.desiredAspectRatio;
      this.app.renderer.resize(screenWidth, newHeight);
      const canvasStyle = this.app.view.style as any;
      canvasStyle.width = `${screenWidth}px`;
      canvasStyle.height = `${newHeight}px`;
    }
  }
  public showImage(name: string): void {
    const resource = this.assetLoader.getResource(name);
    const asset = this.assetLoader.getAsset(name);
    if (resource && asset) {
      const sprite = new PIXI.Sprite(resource.texture);
    // Apply asset properties to the sprite
    if (asset.position) {
      sprite.x = asset.position.x;
      sprite.y = asset.position.y;
    }
    if (asset.scale) {
      sprite.scale.set(asset.scale.x, asset.scale.y);
    }
    if (asset.visible !== undefined) {
      sprite.visible = asset.visible;
    }
    if (asset.width) {
      sprite.width = asset.width;
    }
    if (asset.height) {
      sprite.height = asset.height;
    }
    if (asset.anchor) {
      sprite.anchor.set(asset.anchor.x, asset.anchor.y);
    }
    if (asset.pivot) {
      sprite.pivot.set(asset.pivot.x, asset.pivot.y);
    }

    this.app.stage.addChild(sprite);
  } else {
    console.warn(`Resource ${name} not found.`);
  }
  }
  public clearStage(): void {
    this.app.stage.removeChildren();
  }
}
