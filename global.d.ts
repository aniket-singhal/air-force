// global.d.ts
import * as PIXI from 'pixi.js';

declare global {
  interface Global {
    __PIXI_APP__: PIXI.Application;
  }
}

export {};
