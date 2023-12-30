const express = require("express");
const mongoose = require("mongoose"); //for mongoDB database
const bodyParser = require("body-parser"); //allows parson of request body
const cors = require("cors"); //allows CORS networking
require("dotenv").config(); //for .env file
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const LocalStategy = require("passport-local").Strategy;
// const initializePassport = require("./passportConfig");
const PORT = process.env.PORT;

const app = express();
const mongoString = process.env.LOCAL_DATABASE_URL;

// app.use(cors());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.static("public"));
app.use(bodyParser.json());

// const store = new MongoDBStore({
//     uri: process.env.DATABASE_URL,
//     collection: "sessions",
// });
// store.on("error", (error) => {
//     console.log(error);
// });

// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: store,
//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
//             secure: false,
//             sameSite: "lax",
//         },
//     })
// );

// initializePassport(passport);
// app.use(passport.initialize());
// app.use(passport.session());

//Database
mongoose.set("strictQuery", false);
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database connected");
});

//Routes
// const authenticationRouter = require("./routes/authentication");
// app.use("/auth", authenticationRouter);

const productsRouter = require("./routes/product");
app.use("/products", productsRouter);

const accountRouter = require("./routes/account");
app.use("/accounts", accountRouter);

const cartRouter = require("./routes/cart");
// const User = require("./models/User");
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
    res.json("Welcome to my e-commerce API!");
});

app.listen(PORT, () => {
    console.log(`Running server on PORT ${PORT}`);
});
