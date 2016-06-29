/**
 * Main module.
 * @module main
 */

// Import!
import { sayHello } from './otherFile';
const hi = sayHello('World');
console.log(hi); // eslint-disable-line no-console

// Classes!
class Example {
  // Default arguments!
  constructor(name = '') {
    // String interpolation!
    return `Hello ${name}`;
  }
}

// Let and const!
let myName = 'John';
myName = 'Johnnyboy';

const FIXED_VALUE = 43;
const exmpl = new Example(myName);

// Arrow functions!
const myFunction = (param) => {
  console.log(param, exmpl, FIXED_VALUE); // eslint-disable-line no-console
};
myFunction(1);
