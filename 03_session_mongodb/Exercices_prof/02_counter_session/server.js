import express from "express";
import dotenv from "dotenv";
import session from "express-session";
// import MongoStore from "connect-mongo";
import jwt from "jsonwebtoken"
// import axios from "axios";
import mongoose from "mongoose";

dotenv.config();
const { APP_LOCALHOST: hostname, APP_PORT: port, DB_URL : db } = process.env;
const app = express();

const token = jwt.sign(
    { userId: 123, role: "Admin"},
    'MA PHRASE SECRETE',
    { expiresIn: '24h'}
)

app.use(
  session({
    name: "counter",
    secret: "counter",
    resave: false,
    saveUninitialized: true,
    // store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/" }),
    cookie: { maxAge: 180 * 60 * 1000 },
    randomString: ''
  })
);

async function init()
{
    console.log("ok")
}

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true, // options qui Ã©vitent des warnings inutiles
    })
    .then(init);

const CatsSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
})

const CatModel = mongoose.model('cats', CatsSchema)

app.get("/", async (req, res) => {
  // if (req.session.count) {
  //   req.session.count++;
  // } else {
  //   req.session.count = 1;
  // }
  // res.json({ counter: req.session.count });


// async function test()
// {
//     return new Promise(function(resolve) {
// //         let number = Math.round(Math.random() * 9);
//         let characters = 'ABCDEFGHIJKLMNOPQRSTUVWX';
//         let letter = characters.charAt(Math.floor(Math.random() * characters.length));
//
//         req.session.randomString += (number + letter)
//     })
// }
// test()
// res.send(req.session.randomString)

    // const data = await axios.get('https://jsonplaceholder.typicode.com/users');
    //
    // console.log(data.data)

    const cat = new CatModel({name: "Alan"});

    try {
        let doc = await cat.save();
        console.log(doc);
        const docs = await CatModel.find({});
        res.json(docs)
    }catch(err)
    {
        console.error(err.message)
    }

});

app.get("/delete", (req, res) => {
  req.session.count = 0;
  req.session.randomString = '';

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});