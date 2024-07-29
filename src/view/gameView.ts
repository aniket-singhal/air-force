// src/view/gameView.ts
import * as PIXI from 'pixi.js';
import { gameConfig } from '../gameConfig';
export class GameView {
  public app: PIXI.Application;
  private desiredAspectRatio: number;

  constructor(desiredAspectRatio: number) {
    this.desiredAspectRatio = gameConfig.desiredAspectRatio;;
    this.app = new PIXI.Application({
      width: gameConfig.gameWidth,
      height: gameConfig.gameHeight,
      // backgroundColor: gameConfig.backgroundColor,
    });
    document.body.appendChild(this.app.view as any);

    // Apply CSS styles to center the canvas
    const canvasStyle = this.app.view.style as any;
    canvasStyle.display = 'block';
    canvasStyle.marginLeft = 'auto';
    canvasStyle.marginRight = 'auto';

    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize(); // Call initially to set the correct size
    this.loadManifest();
  }

  private onResize(): void {
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
  private loadManifest(): void {
    fetch('assets/manifest.json')
      .then(response => response.json())
      .then((manifest) => {
        // Use PIXI.Assets to load assets
        const assetPaths: { [key: string]: string } = {};
        manifest.images.forEach((image: { name: string, url: string }) => {
          assetPaths[image.name] = `assets/${image.url}`;
        });

        PIXI.Assets.load(Object.values(assetPaths)).then((assets) => {
          manifest.images.forEach((image: { name: string, url: string }) => {
            const sprite = new PIXI.Sprite(assets[image.name]);
            sprite.x = Math.random() * this.app.renderer.width;
            sprite.y = Math.random() * this.app.renderer.height;
            sprite.anchor.set(0.5);
            this.app.stage.addChild(sprite);
          });
        }).catch(error => console.error('Error loading assets:', error));
      })
      .catch(error => console.error('Error loading manifest:', error));
  }
}
