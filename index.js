const express = require("express");
require("dotenv").config();
const path = require("path");
const event = require("./routes/event.route");
const user = require("./routes/user.route");
const favories =require('./routes/favorite.route')

const dataConnect = require("./connect-db");
const cors = require("cors");
const corsOptions = {
  origin: "*",
};

const app = express();

const { createServer } = require("http");
const httpServer = createServer(app);
dataConnect();
/* dataConnect(); */
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(express.json());

/* uses */
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use("/api", event);
app.use("/api", user);
app.use("/api",favories)

/* task */

httpServer.listen(3001, () => {
  console.log("server creer");
});