require("dotenv").config();
const express = require("express");

const { json } = require("body-parser");
const session = require("express-session");
const port = process.env.PORT || 3000;
const app = express();
const checkForSession = require("./middlewares/checkForSession");
const swagCtrl = require("./controllers/swag_controller");
const authCtrl = require("./controllers/auth_controller");
const cartCtrl = require("./controllers/cart_controller");
const searchCtrl = require("./controllers/search_controller");

//Top middleware
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);
app.use(checkForSession);

app.use(express.static(`${__dirname}/build`));

//Endpoints

//Swag
app.get("/api/swag", swagCtrl.read);

//auth
app.post("/api/login", authCtrl.login);
app.post("/api/register", authCtrl.register);
app.post("/api/signout", authCtrl.signout);
app.get("/api/user", authCtrl.getUser);

//cart
app.post("/api/cart", cartCtrl.add);
app.post("/api/cart/checkout", cartCtrl.checkout);
app.delete("/api/cart", cartCtrl.delete);

//search
app.get("/api/search", searchCtrl.search);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
