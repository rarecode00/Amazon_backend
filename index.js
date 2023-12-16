const connectToMongo = require("./database/connectivity");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

connectToMongo();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./controllers/productController"));
app.use("/api/cart", require("./routes/cart"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
