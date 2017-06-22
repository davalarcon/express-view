const express = require('express');
const expressLayouts = require ('express-ejs-layouts');

const app = express();

// imports the ejs package and allow us to use separate view files
app.set('view engine', 'ejs');

//tells express that our view files are in the pages / folder
app.set('views','pages');
//hosts all the files inside the public /folder from localhost:3000
app.use(express.static('public'));

// telles Express that we want to use the EJS layouts package
app.use(expressLayouts);

// tells Express that our layout file is "pages/my-master-layout.ejs"
app.set('layout', 'my-master-layout.ejs');

//DEFAULTS VALUES FOR VIEW VARIABLES---------

app.locals.myTitle = 'Express Views';
//<title> <%= myTitle %> </title>
app.locals.myBodyClass = 'normal-body';


//ROUTES GO HERE VVVV ---------------------
//-------req short for request/ res short for response. What matters the most is the order.
app.get('/', (req, res, next)=> {
  const myName = 'David';
  const myAge = 35;
  //send pages/home-view.ejs to the browser. Render is a fancy word for "display"
  res.render(
    'home-view.ejs',  //first arg -->name of the view file
      {                     //second arg --> object to transfer variables to the view
        viewNameVar: myName,//  |
        viewAgeVar : myAge  //  |
      }                     //  |
    );
});

const booksList = [
  'Dune',
  'Lord of the Rings',
  'Harry Potter',
  'The Martian',
  'Elon Musk',
  'Necronomics',
  'Eloquent JavaScript'
];

app.get('/books', (req, res, next)=>{
  res.render('books-view.ejs',
  {
    booksforView: booksList
  });
});

const accomplishmentsList = [
  {award: 'Best TA 21 and under', type: 'performance', person: 'Kevin'},
  {award: 'Coolest Swiss Person in Class', type: 'personality', person: 'Daniel K'},
  {award: 'Best Slices of Pizza Eaten', type: 'Strength', person: 'Nik E.'},
  {award: 'Most Beautiful former Cook', type: 'looks', person: 'Josh'},
  {award: 'Best Last Name', type: 'name', person: 'Darren'},
];

app.get('/accomplishments', (req, res, next)=>{
  const randomIndex = Math.floor(Math.random()*accomplishmentsList.length);
  res.render('accomplishments-view.ejs',
{
  accomplishmentsForView: accomplishmentsList,
  featureAccomplishments: accomplishmentsList[randomIndex],
  myTitle : 'Accomplishments - Express View'
});
});

//-------------------------------------------------------
app.listen(3000);
