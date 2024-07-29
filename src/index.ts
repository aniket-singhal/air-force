import { GameModel } from './model/gameModel';
import { GameView } from './view/gameView';
import { GameController } from './controller/gameController';

const desiredAspectRatio = 9 / 16;

const model = new GameModel();
const view = new GameView(desiredAspectRatio);
const controller = new GameController(model, view);

(globalThis as any).__PIXI_APP__ = view.app;
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
  
