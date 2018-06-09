

console.log('Starting Server');
const bodyParser = require("body-parser");
const express = require('express'),
    fs = require('fs'),
  app = express(),
  port = process.env.PORT || 3001;

  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(bodyParser.json({limit: '50mb'}));

  app.get('/bulkusers', (req,res) => {

    let data = [];
    for(let i=1; i<= 100000;i++) {
      data.push({
        id: i,
        name: 'user_' + i,
        email: 'user_'+ i+ '@gmail.com'
      });
    }
    writeToFile(JSON.stringify(data));
    res.send('Done');
  });

app.get('/users', (req,res) => {
  fs.readFile( __dirname + "/" + "users.data", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
   });
});
const options = {flag: 'a'};

async function writeToFile(text) {
  await fs.writeFile(__dirname + "/" + "users.data", text, encoding = 'utf8', (err) => {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log('Success');
  });
}

app.post('/users', function (req, res) {
    let userList = req.body;
    console.log(req.body);
     writeToFile(JSON.stringify(userList));
    res.send(userList);   
})

app.post('/updateUser', function (req, res) {
  let userId = req.body.userId;
  fs.readFile( __dirname + "/" + "users.data", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data.filter(user=> user.id === userId)
      .map(user=> user.isSelected = !user.isSelected);
      writeToFile(JSON.stringify(data));
  });
  res.send({userId});
})

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
