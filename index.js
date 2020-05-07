const express = require('express');
const Datastore = require('nedb'); //retrieving a function that creates a datastore
 
//import the express package into this variable 
const app = express();
const port = process.env.PORT || 3000;
//create a web application using by executing 'express' and putting in a variable
app.listen(PORT, () => {console.log(`Starting server at ${port}`);
});
//3000 is the port - a specific numeric address at which we are going to listen
//and declare a callback

app.use(express.static('public'));
//'public' is the directory folder name
//anything I put in that directory is publicly accesible from the url localhost:3000
app.use(express.json({limit: '1mb' })); //capable of understanding incoming json data
//limit allows me to specify the maximum size of body being received

const database = new Datastore('database.db');
database.loadDatabase(); //load the existing data from the previous time the server ran
//the receiving address, my api for clients to send data to me
//and a callback function that looks at the information and respond

app.get('/api', (request, response) => { 
    database.find({}, (err, data) => {
        //look for everything{}, callback error and data
        //use find to look for documents in your database
        if (err) {
            response.end();
            return;
        }
        response.json(data); 
        //call find, have the data come back, pass data to the client
    });
});

app.post('/api', (request, response) => { 
//request holds all the data contained in that request
//response is a variable we can use to send things back to the client   
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);//send an object back with some data in it
});
 
