# Lecture 15 — Data Modeling

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Objective

Design a simple data model and use SQLAlchemy and Mongoose models with relationships and validation.

## 1. E-Commerce conceptual model

| Entity | Main data | Relationship |
|---|---|---|
| Customer | name, email | Places orders and has a cart |
| Product | name, price | Appears in carts and orders |
| Cart | customer, products, quantities | Belongs to one customer |
| Order | customer, products, quantities, status | Belongs to one customer |

One customer can place many orders. One customer has one cart. A cart can contain many products, and a product can appear in many carts. The same many-to-many relation applies to orders and products. In a relational database, CartItem and OrderItem would store product IDs and quantities. A customer's email should be unique; quantity and price should be positive. This is a conceptual design, so no database-specific SQL is needed here.

## 2–3. SQLAlchemy Student Management

`student_models.py` defines Department, Student, Course and Enrollment. Students belong to departments; courses belong to departments; Enrollment connects students to courses. Student email is unique and required. The example creates a student and enrollment, reads CSE students, updates the branch, deletes the student and checks that the enrollment was removed by the ORM cascade.

Run:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python student_models.py
```

SQLite creates `students.db` in this folder. Running the demonstration again makes another student and deletes it at the end; the department and course are reused.

## 4–5. Mongoose Blog models

`blog_models.js` defines Post and Comment schemas. A comment refers to a post. Required fields and status enums reject invalid documents. A post slug is marked unique, which MongoDB enforces through an index when connected; `unique` is not a local Mongoose validator. The script checks schema validation without needing a database connection.

Run:

```bash
npm install
npm start
```

## Result

The exercise covers the conceptual model, SQLAlchemy relationships and CRUD, cascade deletion, and Mongoose schema validation. The JavaScript validation example does not save documents to MongoDB.
