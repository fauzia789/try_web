const express = require("express");
const path = require("path");  
const app = express();
const cors = require("cors");
require('dotenv').config();
require("./conn/conn");

const user = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());
app.use(express.json());

// Serve static files from the 'frontend/src/images' directory
app.use('/static', express.static(path.join(__dirname, '../frontend/src/images')));

// Serve static files from the frontend's build folder
app.use(express.static(path.resolve(__dirname, "frontend", "build")));

// Routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Serve React app
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`PORT from .env: ${process.env.PORT}`);
});
