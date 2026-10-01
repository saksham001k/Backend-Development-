# Lecture 14B — Database Normalization

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

I used the order data from [Lecture 14A](../L14A/README.md) to apply normalization.

| Stage | Change |
|---|---|
| 1NF | Each order–product pair gets one row; quantity is one value. |
| 2NF | Product name and price move to `products`, since they depend on the product rather than the whole order-line key. Order details move to `orders`. |
| 3NF | Customer name and email move to `customers`, since `order_id → customer_id → customer details` is a transitive dependency. |
| BCNF check | In the resulting tables, each determinant used in the design is a key. |

The final tables are `customers`, `products`, `orders` and `order_items`. Their primary and foreign keys are in [orders_3nf.sql](../L14A/orders_3nf.sql). Joining them reconstructs the sample rows without repeatedly storing the customer's name or product price.

Normalization helps avoid update anomalies: changing a product's price in one row does not leave a different price in another order line. In a real order system, a historical sale price may also be stored in an order item if the business requires that snapshot; the sample exercise uses the current product price.
