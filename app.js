const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html');
    // res.send('<h1>Hello world</h1>');
    // res.end();
   
})
app.post('/',function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var password =req.body.pass;
    var data = {
        members: [
            {
            email_address: password,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                          } 
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    var url = "https://us2.api.mailchimp.com/3.0/lists/a5440c9798";
    const options ={
        method: "POST",
        auth: "yash1:d6e97805810d2b18cb77bf4075c06aa4-us2"
    };
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+ '/success.html')
        }
        else{
            res.sendFile(__dirname+ '/failure.html')
        }
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
});
// app.post('/failure',function(req,res){
//     res.redirect('/');
// })
app.listen(process.env.PORT,function(){
    console.log('server listening on port  number: 3000');
})






//api key
//d6e97805810d2b18cb77bf4075c06aa4-us2

//list id
//a5440c9798