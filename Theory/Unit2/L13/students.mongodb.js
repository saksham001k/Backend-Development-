const database = db.getSiblingDB("student_management");

database.students.insertMany([
  { name: "Aarav", branch: "CSE", email: "aarav@example.com", enrollmentDate: new Date("2024-08-01") },
  { name: "Diya", branch: "ECE", email: "diya@example.com", enrollmentDate: new Date("2023-08-01") },
  { name: "Rohan", branch: "CSE", email: "rohan@example.com", enrollmentDate: new Date("2025-01-15") }
]);

print("CSE students:");
printjson(database.students.find({ branch: "CSE" }).toArray());
