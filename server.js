'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const url = 'mongodb://bjannn:bjannn@ds133231.mlab.com:33231/bjaos?authMechanism=SCRAM-SHA-1';//ONLINE
const Products = mongojs(url,['laMamaia']);
const port = process.env.PORT || 1000;
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(express.static(__dirname + '/src'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());

// CONFIGURATION ABOVE

app.post('/products', (req,res) => {
    Products.laMamaia.insert(req.body, (err, data) => {
        if(err) {
            return err;
        }
        res.json('Product was succesfully added!');
    })
});

app.get('/products', (req, res) => {
    Products.laMamaia.find((err, data) => {
        if(err) {
            return err;
        }
        res.json(data);
    });
});

app.delete('/products/:id', function(req, res){
    var id = req.params.id;
        Products.laMamaia.remove({_id: mongojs.ObjectId(id) }, function(err, data){
        res.json(data);
    });
});


app.put('/products/:id', function(req, res){
    var id = req.params.id;
    Products.laMamaia.findAndModify({ query: { _id: mongojs.ObjectId(id) },
        update: { $set:
            { acquireDate: req.body.acquireDate,
              expireDate: req.body.expireDate,
              name: req.body.name,
              price: req.body.price,
              productValue: req.body.productValue,
              quantity: req.body.quantity,
              status: req.body.status,
              tvaValue: req.body.tvaValue,
              unitMeasure: req.body.unitMeasure
            }},
        new: true }, function(err, data) {
            res.json(data);
    });
});



app.listen(port, function(){
   console.log("App is running on port " + port);
});
