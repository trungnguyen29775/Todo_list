const path = require('path');
const express = require('express')
const morgan = require('morgan');
const handlebars= require('express-handlebars');
const app = express();
const port = 3000;
const todoList=[];
const users =[];

// app.use(morgan('combined'))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))


app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resources\\views'));


app.get('/', (req, res) => {
  res.render('loginPage');
})

app.get('/login',(req,res)=>
{
  res.render('login');
})

app.get('/home',(req,res)=>
{
  res.render('home');
})


app.get('/register',(req,res)=>
{
  res.render('register');
})

app.post('/register',(req,res)=>
{
  try{
    users.push
    (
      {
      id: Date.now().toString,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
      }
    )
    res.redirect('/login')
  }
  catch
  {
    res.redirect('/register')
  }
  console.log(users)
})

app.post('/login',(req,res)=>
{
  try
  {
    if(req.body.email=="admin@" && req.body.password=="admin")
      res.redirect('/home')
    else  
    {
      res.redirect('/login');
    }
  }
  catch
  {
    res.redirect('/login')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

