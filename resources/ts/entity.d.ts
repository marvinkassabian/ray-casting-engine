interface Entity {
  x: number;
  y: number;
  direction: number;
  getHeightInformation(): RenderingInformation;
}

interface RenderingInformation {
  jumpModifier: number;
  crouchModifier: number;
  viewModifier: number;
}
