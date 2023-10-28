const { MongoClient } = require("mongodb");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3001;
const corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
const userRoute = require("./routes/user");
const otherRoute = require("./routes/otherRoutes");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { connect } = require("./db/connectMongo");

connect();

// ROUTES
app.use("/v1/auth/", authRoute);
app.use("/v1/user", userRoute);
app.use("/data", otherRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
