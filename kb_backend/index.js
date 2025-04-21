const express = require("express");
require ("dotenv").config();
const cors = require("cors");
const { mongoose } =  require("mongoose");
const session = require("express-session");
const mongoDbsession = require("connect-mongodb-session")(session);


//--------Files-Import----------------
const db = require('./db');
const AuthRouter = require("./Routers/AuthRouter");
const BooksRouter = require("./Routers/BooksRouter");
const LikeBookRouter = require("./Routers/LikeBookRouter");
const CartRouter = require("./Routers/CartRouter");
const OrderRouter = require("./Routers/OrderRouter");


//--------Constants----------------
const app = express();
const PORT = process.env.PORT || 8050;
const store = new mongoDbsession({
    uri : process.env.MONGOATLAS,
    collection : "sessions",
})


//--------Middlewares----------------
app.use(cors({
    origin: 'https://kitab-bazaar-nygfavheh-mousumi-das-projects.vercel.app',
    credentials: true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
    session({
        secret : process.env.SECRETKEY,
        store : store,
        resave : true,
        saveUninitialized : false,
    })
);


//--------Routers----------------
app.use('/auth',AuthRouter);
app.use('/books',BooksRouter);
app.use('/likebook',LikeBookRouter);
app.use('/cart',CartRouter);
app.use('/order',OrderRouter);

//--------Listener----------------
app.listen(PORT,() => {
    console.log(`server running at:`);
    console.log(`http://localhost:${PORT}`);
});




// MONGOCOMPASS=mongodb://localhost:27017/KitaabBaazaar