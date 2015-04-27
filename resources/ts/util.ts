"use strict";

module Engine.Util {

  export var CIRCLE = Math.PI * 2;

  export function clamp(baseNumber: number, lowerBound: number, upperBound: number): number {
    var tempNumber = Math.max(baseNumber, lowerBound);
    return Math.min(tempNumber, upperBound);
  }
}
