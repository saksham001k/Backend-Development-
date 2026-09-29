// Arrays
const fruits = ["Apple", "Banana", "Mango"];
console.log("--- Array Demonstration ---");
console.log("Fruits:", fruits);
fruits.push("Orange");
console.log("After push:", fruits);

// Objects
const student = {
    name: "Saksham Katiyar",
    sapId: "590015169",
    course: "Backend Development"
};
console.log("\n--- Object Demonstration ---");
console.log("Student:", student);
console.log("Student Name:", student.name);

// Functions
function greet(name) {
    return "Hello, " + name + "! Welcome to Backend Development Lab.";
}
console.log("\n--- Function Demonstration ---");
console.log(greet(student.name));
