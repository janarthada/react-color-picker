interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropper {
  open(): Promise<EyeDropperResult>;
}

declare var EyeDropper: {
  prototype: EyeDropper;
  new(): EyeDropper;
}; 