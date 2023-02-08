const express = require("express")
const app = express()
const path = require("path")
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DanceAcademy', {useNewUrlParser: true});
const port = 8080;
 
//Define the schema
var contactSchema = new mongoose.Schema({
    name :String,
    PhoneNumber :String, 
    Email :String, 
    address :String, 
    desc :String, 
});

var Contact = mongoose.model('Contact', contactSchema);

app.use('static', express.static('static')) //
// app.use(express.urlencoded())

//PUG SPECIFIC STUFF

app.set('views engine', 'pug') // set the template a a engine
app.set('views', path.join(__dirname, 'views')) //set the views directory

//END POINTS

app.get('/', (req, res) => {
    const params = {  }
    res.status(200).render("home.pug", params);
});
app.get('/contact', (req, res) => {
     const params = {  }
    res.status(200).render("contact.pug", params);
}); 
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);  
    myData.save().then(()=>{
    res.send("The item is saved in the database")
    }).catch(()=>{ 
     res.status(400).send("Item is not saved in data base") 
    }) 
    // res.status(200).render('contact.pug')
})

    //start the server   
    
app.listen(port, () => {
     console.log(`The application start successfully on the port ${port}`);
});