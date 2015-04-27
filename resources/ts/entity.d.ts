interface Entity {
  x: number;
  y: number;
  direction: number;
  getHeightInformation(): RenderingInformation;
}

interface RenderingInformation {
  height: number;
  jumpModifier: number;
  crouchModifier: number;
  viewModifier: number;
}
