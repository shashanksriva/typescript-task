import { it, eq, log } from "./testing";

// TASK 1
// Define TypeScript interfaces for Square, and Triangle shapes
// with appropriate properties
// (sideLength for Square, base & height for Triangle).
// HINT: use kind property to define a type

interface Circle {
  kind: "circle";
  radius: number;
}
// extend Shape to support all types of shapes

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

// TASK 2
// Implement type guard functions for each shape:
// isCircle, isSquare, and isTriangle.

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

function calculateCircleArea(circle: Circle): number {
  return Math.PI * circle.radius ** 2;
}

function isSquare(shape: Shape): shape is Square {
  return shape.kind === "square";
}

function calculateSquareArea(square: Square) {
  return Math.pow(square.sideLength, 2);
}

function isTriangle(shape: Shape): shape is Triangle {
  return shape.kind === "triangle";
}

function calculateTriangleArea(shape: Triangle) {
  return (shape.base * shape.height) / 2;
}

// TASK 3: implement universal method calculateArea
// which should be able to accept different shapes.
// Use type guards to narrow down the shape type
// Return shape.sideLength ** 2 for Square.
// Return (shape.base * shape.height) / 2 for Triangle.

function calculateArea(shape: Shape): number {
  if (isCircle(shape)) return calculateCircleArea(shape);
  if (isSquare(shape)) return calculateSquareArea(shape);
  if (isTriangle(shape)) return calculateTriangleArea(shape);
  throw new Error("Wrong shape");
}

// Testing
const circle = { kind: "circle", radius: 10 } satisfies Circle;
it("calculate circle area", () =>
  calculateArea(circle) === circle.radius ** 2 * Math.PI);

// TASK 4: Add tests for other shapes
const square = { kind: "square", sideLength: 10 } satisfies Square;
it("calculate square area", () =>
  calculateArea(square) === Math.pow(square.sideLength, 2));

const triangle = { kind: "triangle", base: 4, height: 8 } satisfies Triangle;
it("calculate triangle area", () =>
  calculateArea(triangle) === (triangle.base * triangle.height) / 2);

// TASK 5: define a type ShapeWithProperties which allows to add
// any arbitary properties to the shape (use loose index signatures)
// HINT: use intersection Shape & { structural type }

type ShapeWithProperties = Shape & {
  [propName: string]: any;
};
// TASK 6: create an object of type ShapeWithProperties with additional
// properties color and label,
// use spread operator to immutably copy existing properties of square to the new object
// test its usage with calculateArea

const squareWithProperties: ShapeWithProperties = {
  ...square,
  color: "red",
  label: "red square",
};

it("calculate area of square with properties", () =>
  calculateArea(squareWithProperties) === Math.pow(square.sideLength, 2));
it("Color of square with properties", () =>
  squareWithProperties.color === "red");
it("Label of square with properties", () =>
  squareWithProperties.label === "red square");

// TASK 7: add more overloaded signatures for different types
// HINT: a common mistake is to add more than 3 arguments to createShape() implementation
// instead, you need to add thirdArgument (optional) and use these arguments
// to create Square and Triangle

//function createShape(kind: "circle", radius: number): Circle;

function createShape(
  kind: string,
  firstArgument: number,
  secondArgument?: number
): Shape {
  switch (kind) {
    case "circle":
      return { kind: "circle", radius: firstArgument } as Circle;
    case "square":
      return { kind: "square", sideLength: firstArgument } as Square;
    case "triangle":
      if (secondArgument === undefined) {
        throw new Error("Missing argument for triangle");
      }
      return {
        kind: "triangle",
        base: firstArgument,
        height: secondArgument!,
      } as Triangle;
  }
  throw new Error("Invalid arguments for creating a shape");
}

it("create shape circle", () =>
  eq(createShape("circle", 5), { kind: "circle", radius: 5 }));
// it("create shape square", () =>
//   eq(createShape("square", 4), { kind: "square", sideLength: 4 }));
// it("create shape triangle", () =>
//   eq(createShape("triangle", 3, 6), { kind: "triangle", base: 3, height: 6 }));

// TASK 8: add tests for triangle and square
// e.g. createShape("square", 3) should return square with a side 3
it("create shape square", () =>
  eq(createShape("square", 3), { kind: "square", sideLength: 3 }));
it("create shape triangle", () =>
  eq(createShape("triangle", 4, 5), { kind: "triangle", base: 4, height: 5 }));

// TASK 9: implement function printShapesInfo(...shapes) which takes
// shapes array as an argument and prints all shapes with the use of printShapeInfo()

function printShapesInfo(...shapes: Shape[]) {
  for (const shape of shapes) {
    printShapeInfo(shape);
  }
}

function printShapeInfo(shape: Shape): void {
  if (isCircle(shape)) log("Circle radius :" + shape.radius);
  if (isSquare(shape)) log("Square side   :" + shape.sideLength);
  if (isTriangle(shape))
    log("Triangle base: " + shape.base + " height: " + shape.height);
}

printShapesInfo(circle, square, triangle);

// Example usage: printShapesInfo(circle, square, triangle);

// TASK 10: we have a function printProperties() which takes 2 arguments:
// 1) object with property "kind" and any number of other properties
// 2) function to process every option and return a string representation
// function should print the complete information about an object and
// all its properties

// TODO: specify argument types (instead of any)

function printProperties(
  obj: ShapeWithProperties,
  getProperty: (propName: string, propValue: string | number) => string
) {
  for (const propName in obj) {
    if (propName !== "kind") {
      const propValue = obj[propName];
      const processedPropValue = getProperty(propName, propValue);
      log(`${processedPropValue}`);
    }
  }
}

// TASK 11: define the enumeration for type ShapeEnum
// (with values Circle, Square, Triangle)
// Implement a function which takes ShapeEnum and return number of angles.
enum ShapeEnum {
  CIRCLE,
  SQUARE,
  TRIANGLE,
}

function getNumberOfAngles(shape: ShapeEnum): number {
  switch (shape) {
    case ShapeEnum.CIRCLE:
      return 0;
    case ShapeEnum.SQUARE:
      return 4;
    case ShapeEnum.TRIANGLE:
      return 3;
    default:
      throw new Error("Unknown shape");
  }
}

// TASK 12: implement tests for function getNumberOfAngles, e.g.
// getNumberOfAngles(ShapeEnum.Circle) === 0
// getNumberOfAngles(ShapeEnum.Square) === 4
it("number of angles in Circle", () =>
  getNumberOfAngles(ShapeEnum.CIRCLE) === 0);
it("number of angles in Square", () =>
  getNumberOfAngles(ShapeEnum.SQUARE) === 4);
it("number of angles in Triangle", () =>
  getNumberOfAngles(ShapeEnum.TRIANGLE) === 3);
