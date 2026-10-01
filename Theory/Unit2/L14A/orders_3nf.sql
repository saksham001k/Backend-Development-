CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id)
);

CREATE TABLE order_items (
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id)
);

INSERT INTO customers VALUES
(1, 'Aarav', 'aarav@email'),
(2, 'Diya', 'diya@email');

INSERT INTO products VALUES
(1, 'Laptop', 65000),
(2, 'Mouse', 500),
(3, 'Keyboard', 1500);

INSERT INTO orders VALUES (1, 1), (2, 2);
INSERT INTO order_items VALUES (1, 1, 1), (1, 2, 2), (2, 3, 1);

SELECT o.id AS order_id, c.name AS customer_name, c.email,
       p.name AS product_name, p.price, oi.quantity
FROM order_items AS oi
JOIN orders AS o ON o.id = oi.order_id
JOIN customers AS c ON c.id = o.customer_id
JOIN products AS p ON p.id = oi.product_id
ORDER BY o.id, p.id;
