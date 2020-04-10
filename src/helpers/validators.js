/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  all,
  allPass,
  complement,
  compose,
  converge,
  countBy,
  equals,
  identity,
  lte,
  max,
  prop,
  propOr,
  reduce,
  reject,
  values
} from "ramda";
import { COLORS, SHAPES } from "../constants";

const numberOfColors = compose(countBy(identity), values);
const numberOfShapesWithColor = color => compose(propOr(0, color), numberOfColors);
const numberOfShapesWithRedColor = numberOfShapesWithColor(COLORS.RED);
const numberOfShapesWithGreenColor = numberOfShapesWithColor(COLORS.GREEN);
const getWhite = prop(COLORS.WHITE);
const getGreen = prop(COLORS.GREEN);
const getTriangle = prop(SHAPES.TRIANGLE);
const getSquare = prop(SHAPES.SQUARE);
const getCircle = prop(SHAPES.CIRCLE);
const getStar = prop(SHAPES.STAR);
const isWhite = equals(COLORS.WHITE);
const isGreen = equals(COLORS.GREEN);
const isRed = equals(COLORS.RED);
const isBlue = equals(COLORS.BLUE);
const isOrange = equals(COLORS.ORANGE);
const containsTwoWhiteShapes = compose(equals(2), getWhite, numberOfColors);
const isStarEqualsRed = compose(isRed, getStar);
const isStarEqualsWhite = compose(isWhite, getStar);
const isSquareEqualsGreen = compose(isGreen, getSquare);
const isTriangleEqualsWhite = compose(isWhite, getTriangle);
const isTriangleEqualsGreen = compose(isGreen, getTriangle);
const isCircleEqualsBlue = compose(isBlue, getCircle);
const isSquareEqualsOrange = compose(isOrange, getSquare);
const getMaxColorNumber = compose(reduce(max, 0), values);
const isRedEqualsBlue = ({ red, blue }) => red === blue;

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isStarEqualsRed, isSquareEqualsGreen, containsTwoWhiteShapes]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(lte(2), getGreen, numberOfColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(isRedEqualsBlue, numberOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([isCircleEqualsBlue, isStarEqualsRed, isSquareEqualsOrange]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(lte(3), getMaxColorNumber, numberOfColors, reject(isWhite));

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
  isTriangleEqualsGreen,
  compose(lte(2), numberOfShapesWithGreenColor),
  compose(lte(1), numberOfShapesWithRedColor)
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(all(isOrange), values);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([complement(isStarEqualsRed), complement(isStarEqualsWhite)]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(all(isGreen), values);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
  converge(equals, [getTriangle, getSquare]),
  complement(isTriangleEqualsWhite)
]);
