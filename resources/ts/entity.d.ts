interface Entity {
  x: number;
  y: number;
  direction: number;
  getHeightInformation(): RenderingInformation;
}

interface RenderingInformation {
  heightModifier: number;
  viewAngle: number;
}
