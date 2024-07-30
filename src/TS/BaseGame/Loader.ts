// import * as PIXI from 'pixi.js';
import { Loader, LoaderResource } from '@pixi/loaders';
import { Asset, Manifest } from '../constants/interferences';

export class AssetLoader {
  private loader: Loader;
  private resources: { [key: string]: LoaderResource } = {};
  private assets: { [key: string]: Asset } = {};

  constructor() {
    this.loader = new Loader();
  }

  public loadAssets(manifestUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(manifestUrl)
        .then(response => response.json())
        .then((manifest: Manifest) => {
          manifest.images.forEach((asset) => {
            this.loader.add(asset.name, asset.url);
            this.assets[asset.name] = asset;
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
  public getAsset(name: string): Asset | undefined {
    return this.assets[name];
  }
}
