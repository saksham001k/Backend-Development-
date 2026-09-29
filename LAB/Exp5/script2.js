// String methods
const str = "Backend Development";
console.log("--- String Methods ---");
console.log("Original:", str);
console.log("Upper Case:", str.toUpperCase());
console.log("Lower Case:", str.toLowerCase());
console.log("Split by space:", str.split(" "));

// Array: add, read and update
const items = ["Node", "Express"];
console.log("\n--- Array Methods ---");
items.push("MongoDB");
console.log("After Adding:", items);
console.log("First Item:", items[0]);
items[0] = "Node.js";
console.log("After Updating:", items);

// Object: add, read and update
const user = { name: "Saksham", role: "Student" };
console.log("\n--- Object Methods ---");
user.course = "Backend Development";
console.log("After Adding Key:", user);
console.log("User Name:", user.name);
user.role = "Backend Learner";
console.log("After Updating Role:", user);
