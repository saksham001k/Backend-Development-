import { add, sum } from './math.mjs';

const greet = (name = 'Guest') => `Hello, ${name}!`;
const colours = ['red', 'green', 'blue'];
const [first, ...remaining] = colours;
const student = { name: 'Saksham Katiyar', course: 'Backend Development' };
const { name, course } = student;
const key = 'section';
const profile = { name, course, [key]: 'CSE', describe() { return `${this.name}: ${this.course}`; } };

class Person {
  constructor(name) { this.name = name; }
  greet() { return greet(this.name); }
}
class Student extends Person {
  constructor(name, sapId) { super(name); this.sapId = sapId; }
}

console.log(greet());
console.log(`First colour: ${first}; remaining: ${remaining.join(', ')}`);
console.log([...colours, 'yellow']);
console.log(profile.describe());
console.log(new Student(name, '590015169').greet());
console.log(`Module addition: ${add(2, 3)}; rest sum: ${sum(1, 2, 3, 4)}`);

const loadMessage = () => Promise.resolve('Data loaded');
loadMessage().then(message => console.log(`Promise: ${message}`));
async function showMessage() {
  try { console.log(`Async/await: ${await loadMessage()}`); }
  catch (error) { console.error(error); }
}
showMessage();
