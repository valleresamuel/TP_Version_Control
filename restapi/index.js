var express = require('express');                       // Call express module
var app = express();                                    // define our app using express
const bodyParser = require('body-parser');              // Call body-Parser module
var db = {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'samuel57',
      database : 'restapi'
    }
  };
const path = require('path');                           // call path
var knex = require('knex')(db);                         // set up the database connection using knex
app.use(bodyParser.urlencoded({ extended: true }));     // configure app to use bodyParser() 
app.get('/main.html', function (req, res) {             // configure the path to any dirname followed by main.html
    res.sendFile(path.join(__dirname, "main.html"));    // here it will be localhost:3002/main.html
 })

/*app.get('/', function (req, res) {
   knex.select().from('city').then(function (data){     //SELECT * FROM city
       res.send(data);
   });
   res.send('SUCCESS');
}); */

/*app.post('/submit', function(req, res){
    console.log("-POST-");



}) */

//Read operation
app.get('/cityget', function (req, res){
    response = {
        city_name:req.query.city_name,
     };
     console.log(response);
     knex('city').where({
         Name: response.city_name
     }).select("*").then(function(data) {
         res.send(data)
     });

})

//Create operation
app.post('/create', function (req, res){
    response = {
        city_name:req.body.city_name,
        country_code:req.body.country_code,
        district:req.body.district,
        population:req.body.population,
     };
     console.log(response);
     knex('city').insert({Name: response.city_name, CountryCode: response.country_code, 
        District: response.district, Population: response.population})
     .then(function(data) {
         res.send(response)
     });

})

//Update operation
app.get('/update', function (req, res){
    response = {
        city_name:req.query.city_name,
        country_code:req.query.country_code,
        district:req.query.district,
        population:req.query.population,
     };
     console.log(response);
     knex('city').where({
         Name: response.city_name
     }).update({Name: response.city_name, CountryCode: response.country_code, 
        District: response.district, Population: response.population}).then(function(data) {
         console.log(data)
     });
     knex('city').where({
        Name: response.city_name
    }).select("*").then(function(data) {
        res.send(response)
    });
})

//Delete operation
app.get('/delete', function (req, res){
    response = {
        city_name:req.query.city_name,
     };
     console.log(response);
     knex('city').where({
         Name: response.city_name
     }).select("*").del().then(function(data) {
         res.send(JSON.stringify(data))
     });

})
//Create a server running on port 3002
var server = app.listen(3002, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
