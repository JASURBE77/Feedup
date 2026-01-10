// hellpef
const express = require("express");
const app = express();
const cors = require("cors");
const UserRouter = require("./src/routes/user.routes");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/product.routes");
const startBot  = require("./src/bot/verifyCode.bot");


connectDB();
app.use(express.json());
app.use(cors());
startBot();

app.use("/", UserRouter, productRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
