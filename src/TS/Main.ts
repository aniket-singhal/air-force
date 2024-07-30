
import { GameController } from './BaseGame/controller/gameController';
import { AssetLoader } from './BaseGame/Loader';
import { GameModel } from './BaseGame/model/gameModel';
import { GameView } from './BaseGame/view/gameView';

export class Main {
  private assetLoader: AssetLoader;
  private model: GameModel;
  private view: GameView;
  private controller: GameController;

  constructor() {
    this.assetLoader = new AssetLoader();
    this.model = new GameModel();
    this.view = new GameView(this.assetLoader);
    this.controller = new GameController(this.model, this.view);
  }

  public initialize(): void {
    const manifestUrl = 'assets/manifest.json';

    this.assetLoader.loadAssets(manifestUrl)
      .then(() => {
        console.log('Assets loaded');
        this.view.onAssetsLoaded();

        // Handle window resize
        window.addEventListener('resize', () => {
          this.view.onResize();
        });
      })
      .catch(err => {
        console.error('Error loading assets:', err);
      });

    // Expose PIXI app globally for debugging
    (globalThis as any).__PIXI_APP__ = this.view.app;

    // Register service worker if needed
    this.registerServiceWorker();
  }
  

  // Optional: Service Worker Registration
  private registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.error('ServiceWorker registration failed: ', error);
          });
      });
    }
  }
}
