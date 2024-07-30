// import * as PIXI from 'pixi.js';
import { Loader, LoaderResource } from '@pixi/loaders';

export class AssetLoader {
  private loader: Loader;
  private resources: { [key: string]: LoaderResource } = {};

  constructor() {
    this.loader = new Loader();
  }

  public loadAssets(manifestUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(manifestUrl)
        .then(response => response.json())
        .then(manifest => {
          manifest.images.forEach((image: { name: string, url: string }) => {
            this.loader.add(image.name, image.url);
          });

          this.loader.load((loader, resources) => {
            this.resources = resources;
            resolve();
          });

          this.loader.onError.add(() => {
            reject(new Error('Error loading assets.'));
          });
        })
        .catch(err => reject(err));
    });
  }

  public getResource(name: string): LoaderResource | undefined {
    return this.resources[name];
  }
}
