/* eslint-disable prefer-promise-reject-errors */
/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {
  __,
  allPass,
  andThen,
  assoc,
  compose,
  concat,
  gt,
  ifElse,
  length,
  lt,
  lte,
  modulo,
  otherwise,
  prop,
  tap,
  toString
} from "ramda";

import Api from "../tools/api";

const api = new Api();

const isPositiveNumber = compose(lte(0), Number);
const isValid = allPass([compose(gt(10), length), compose(lt(2), length), isPositiveNumber]);
const validate = ifElse(
  isValid,
  x => Promise.resolve(x),
  () => Promise.reject("ValidationError")
);
const createConvertParams = assoc("number", __, { from: 10, to: 2 });
const getResult = prop("result");
const convertToInt = compose(Math.round, Number);
const pow2 = x => x ** 2;
const convertToBinary = compose(andThen(getResult), api.get("https://api.tech/numbers/base"), createConvertParams);
const getAnimal = compose(andThen(getResult), api.get(__, {}), concat("https://animals.tech/"), toString);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const log = tap(writeLog);
  compose(
    otherwise(handleError),
    andThen(handleSuccess),
    andThen(getAnimal),
    andThen(log),
    andThen(modulo(__, 3)),
    andThen(log),
    andThen(pow2),
    andThen(log),
    andThen(length),
    andThen(log),
    andThen(convertToBinary),
    andThen(log),
    andThen(convertToInt),
    validate,
    log
  )(value);
};

export default processSequence;
