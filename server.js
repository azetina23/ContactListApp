var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require("body-parser");

// // just to test if express is working
// app.get('/', function(reg, res) {
//   res.send("Hello world!");
// });

app.use(bodyParser.json());

//grabbing html file
app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function(reg, res) {
  console.log("I recieved a GET request")

  // person1 = {
  //   name:"Ricky",
  //   email:"rick@roll.com",
  //   number:"111-111-1111"
  // };
  //
  // person2 = {
  //   name:"Bob",
  //   email:"bob@bill.com",
  //   number:"222-222-2222"
  // };
  //
  // person3 = {
  //   name:"Jill",
  //   email:"jilly@bean.com",
  //   number:"333-333-3333"
  // };
  //
  // var contactlist = [person1, person2, person3];
  // res.json(contactlist);

  db.contactlist.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });

});

app.post("/contactlist", function(req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, docs) {
    res.json(docs);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findAndModify(
    {query: {_id: mongojs.ObjectId(id)},
      update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
      new: true
    }, function(err,doc) {
      res.json(doc);
    });
});

// listening to things that only have port 3000
app.listen(3000);

console.log("Server running on port 3000");
