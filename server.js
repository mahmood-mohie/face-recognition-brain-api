const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')

const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : 'post12data',
      database : 'smartBrain'
    }
  });

const app = express()

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get("/", (req , res) => { res.send('success'); })
app.post('/signin', (req, res) => { signin.handelSignin(req, res , db , bcrypt)})
app.post("/register", (req, res) => { register.handelRegister(req, res , db , bcrypt)} )
app.get("/profile/:id", (req, res) => { profile.handelProfile(req, res , db )})
app.put("/image",(req, res) => { image.handelImage(req, res , db )} )
app.post("/imageUrl",(req, res) => { image.handelClarifaiApi(req, res )} )

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is runnign on port ${process.env.PORT}`)
})

/*
== API Design ==

/ --> res = this is working 
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/