var express = require('express');
var app = express();
var request = require('request');




var options = {
    url:'https://api.yelp.com/v3/businesses/',
        
        
    headers: {
    'Authorization': 'Bearer uDkgEX73x7E0zNWt0fcM0il_FIWNbdSbXzOTn8CR3D'+
            '5nUTfZtwSbYdiyaTYY0px-oXOdMHpPpGs8qSmWScTUxv-zCo3YKp2m3wSi'+
            'kdFP_oOCHPVblupt0bFNpslbW3Yx'
    }
    };
 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/restaurants', function(req, res){
    
    
   
    var cuisine= req.query.cuisine;
    var price= req.query.price;
    var sortBy= req.query.sortBy;

    if (cuisine!="")
    {
        options.url = options.url +'search?term=restaurants&locale=en_CA'+
                '&location=vancouver,bc,canada&categories='+cuisine+'&';
    }
    if (price!="")
    {
        options.url = options.url +'price='+price+'&';
    }
    if (sortBy!="")
    {
        options.url = options.url +'sort_by='+sortBy+'&';
    }
        
       

 
     request(options,function(error, response, body) {
        if (error) {
        return console.error(error);
        } else {
       
        res.send(body);
        console.log(body);
        }   
    }
    );  
    options.url='https://api.yelp.com/v3/businesses/';
   


}); 



 app.get('/reviews', function(req, res){
    console.log('review got');
    var id = req.query.id;

    options.url = options.url+id+'/reviews';
    
    request(options, function(error, response,body){
        if (error) {
            return console.error(error);
            } else {
                      
            res.send(body);
            console.log('review sent');
            }   

    });

 


     options.url = 'https://api.yelp.com/v3/businesses/';
 });




app.listen(3001);
console.log('Server running at http://127.0.0.1:3001/');
