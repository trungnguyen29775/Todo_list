const path = require('path');
const express = require('express')
const morgan = require('morgan');
const handlebars= require('express-handlebars');
const app = express();
const port = 3000;
const { Sequelize, DataTypes,Model  } = require('sequelize');
//variable for login and register
const bcrypt = require('bcrypt');
//session
var session = require('express-session');
const { userInfo } = require('os');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
// app.use(morgan('combined'))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

const sequelize = new Sequelize('todo_database', 'root', 'trungntmt2808', {
  host: 'localhost',
  dialect: 'mysql'
})

class User extends Model {}

User.init({
 
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    primaryKey:true,
    allowNull:false
  },
  password:
  {
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User',
  tableName:"user-info"
});

async function CheckConnect()
{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function CreateDatase()
{
  await User.sync({force:true});
  console.log("The table for the User model was just created!");
}



CheckConnect();
// CreateDatase();

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
    async function CreateUser()
    {
      const hashedPassword = await bcrypt.hash(req.body.password,10);
      return User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      }
      
    );
    }
    CreateUser();
    res.redirect('/login')
 }
 catch
 {
  res.redirect('/login')
 }
})

app.post('/login',(req,res)=>
{
  try{
    async function CheckLogin()
    {
      const identify = await User.findOne({ where: { email:req.body.email } });
      if (identify === null) {
        res.redirect('/login')
      } else {
        if (bcrypt.compare(req.body.password,identify.password))
          res.redirect('/home')
      }
    }
    CheckLogin();
  }
  catch{
    res.redirect('/login')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})

const test = async ()=>{ return await User.findOne({ where: { title: 'admin@' } })};
console.log(test);