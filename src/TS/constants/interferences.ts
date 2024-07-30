export interface Asset {
    name: string;
    url: string;
    position?: { x: number, y: number };
    scale?: { x: number, y: number };
    visible?: boolean;
    width?: number;
    height?: number;
    anchor?: { x: number, y: number };
    pivot?: { x: number, y: number };
  }
  export interface Manifest {
    images: Asset[];
  }