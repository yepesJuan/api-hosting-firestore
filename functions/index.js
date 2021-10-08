const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("./src/products");
const { createCustomer, getAllCustomers } = require("./src/customers");
const { createOrders } = require("./src/orders");

const app = express();
app.use(cors());

app.get("/products/:productId", getProductById);
app.get("/products", getAllProducts);
app.post("/products", createProduct);
app.patch("/products/:productId", updateProduct);
app.delete("/products/:productId", deleteProduct);

app.post("/customers", createCustomer);
app.get("/customers", getAllCustomers); // how to shift up or down?


app.post("/orders", createOrders);


exports.app = functions.https.onRequest(app); // ((req,res) =>app(req, res))
