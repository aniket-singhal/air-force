import { GameModel } from './model/gameModel';
import { GameView } from './view/gameView';
import { GameController } from './controller/gameController';
import { AssetLoader } from './Loader';

const desiredAspectRatio = 9 / 16;
const assetLoader = new AssetLoader();
const model = new GameModel();
const gameView = new GameView(desiredAspectRatio,assetLoader);
const controller = new GameController(model, gameView);


// Load assets
assetLoader.loadAssets('assets/manifest.json')
  .then(() => {
    console.log('Assets loaded');
    // Show the plane image in the center of the screen
    gameView.showImage('plane', window.innerWidth / 2, window.innerHeight / 2);

    // Handle window resize
    window.addEventListener('resize', () => {
      gameView.resize();
    });
  })
  .catch(err => {
    console.error('Error loading assets:', err);
  });
(globalThis as any).__PIXI_APP__ = gameView.app;
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//           console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         })
//         .catch(error => {
//           console.error('ServiceWorker registration failed: ', error);
//         });
//     });
//   }
  
