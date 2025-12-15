import { it, eq, log } from "./testing";

log("<h2>CLASSES</h2>");

// TASK: Complete refactoring of Shape App with OOP and classes

// 1) Implement classes for each Shape type (Square, Triangle)

// 2) Add constructors, methods calculateArea() and draw() for each class

abstract class Shape {
  abstract calculateArea(): number;
  private _color: string = "";

  draw() {
    let className = Object.getPrototypeOf(this).constructor.name;
    log("Drawing " + className);
    log("With color " + this._color);
  }

  setColor(color: string): this {
    this._color = color;
    return this;
  }

  static createShape(
    kind: "circle" | "square" | "triangle",
    second: number,
    third?: number
  ) {
    if (kind === "circle") return new Circle(second);
    if (kind === "square") return new Square(second);
    if (kind === "triangle") return new Triangle(second, third);
    throw Error("unknown type");
  }
}

class Circle extends Shape {
  private _radius: number;

  constructor(radius: number) {
    super();
    this._radius = radius;
  }

  override draw() {
    super.draw();
    log("With radius: " + this.radius);
  }

  calculateArea(): number {
    return this.radius ** 2 * Math.PI;
  }

  set radius(radius) {
    if (radius <= 0) throw Error("radious should be positive");
    this._radius = radius;
  }
  get radius() {
    return this._radius;
  }
}

class Square extends Shape {
  private _sideLength: number;

  constructor(sideLength: number) {
    super();
    this._sideLength = sideLength;
  }

  override draw() {
    super.draw();
    log("With side: " + this._sideLength);
  }

  calculateArea(): number {
    return Math.pow(this._sideLength, 2);
  }

  set sideLength(sideLength) {
    if (sideLength <= 0) throw Error("Side should be positive");
    this._sideLength = sideLength;
  }
  get sideLength() {
    return this._sideLength;
  }
}

class Triangle extends Shape {
  private _base: number;
  private _height: number;

  constructor(base: number, height) {
    super();
    this._base = base;
    this._height = height;
  }

  override draw() {
    super.draw();
    log("With base  : " + this._base);
    log("with height: " + this._height);
  }

  calculateArea(): number {
    return (this._base * this._height) / 2;
  }

  set base(base) {
    if (base <= 0) throw Error("Side should be positive");
    this._base = base;
  }
  get base() {
    return this._base;
  }

  set height(height) {
    if (height <= 0) throw Error("Height cannot be negative");
    this._height = height;
  }
  get height() {
    return this._height;
  }
}

// 3) add support of Square and Triangle to the static method createShape [done]

let s = Shape.createShape("circle", 5);
s.calculateArea();
let squareShape = Shape.createShape("square", 5);
squareShape.calculateArea();
let triangleShape = Shape.createShape("triangle", 5, 8);
triangleShape.calculateArea();

// 4) Use shape methods to create Square and Triangle shapes,
// set color and draw, and calculate areas  [Done]
let shape = Shape.createShape("circle", 10);
shape.setColor("blue").draw();
log("Circle Area:" + shape.calculateArea());

squareShape.setColor("red").draw();
log("Square Area:" + squareShape.calculateArea());

triangleShape.setColor("blue").draw();
log("Triangle Area:: " + triangleShape.calculateArea());

// 5) Implement sideLength getter and setter for Square
// add tests for sideLength (sideLength should not be negative)

it("set radius to 0 with exception", () => {
  try {
    shape.radius = 0; // should throw exception
  } catch (e) {
    return true;
  }
  return false;
});

it("set radius to 3 with no exception", () => {
  shape.radius = 3; // should not throw exception
  return shape.radius == 3;
});

//Test for square
it("set side to -1 with exception", () => {
  try {
    squareShape.sideLength = -1; // should throw exception
  } catch (e) {
    return true;
  }
  return false;
});

it("set side to 5 with no exception", () => {
  squareShape.sideLength = 5; // should not throw exception
  return squareShape.sideLength == 5;
});

//Test for triangle base
it("set base to -1 with exception", () => {
  try {
    triangleShape.base = -1; // should throw exception
  } catch (e) {
    return true;
  }
  return false;
});

it("set base to 8 with no exception", () => {
  triangleShape.base = 8; // should not throw exception
  return triangleShape.base == 8;
});

//Test for triangle height
it("set height to 0 with exception", () => {
  try {
    triangleShape.height = -1; // should throw exception
  } catch (e) {
    return true;
  }
  return false;
});

it("set base to 8 with no exception", () => {
  triangleShape.height = 16; // should not throw exception
  return triangleShape.height == 16;
});
