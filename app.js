const express = require('express');
const path = require('path');
// const fs = require('fs');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//Pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
 //End Points

 app.get('/', (req, res)=>{
   const param = {};
   res.status(200).render('home.pug');
 })
 app.get('/contact', (req, res)=>{
   const param = {};
   res.status(200).render('contact.pug');
  })
  app.post('/contact', (req, res)=>{
   let myData = new Contact(req.body);
   myData.save().then(()=>{
     res.send("Your feedback has been submitted successfully!");
    }).catch(()=>{
      res.status(400).send("Feedback not submitted!");
    })

    // res.status(200).renrder('contact.pug');
  })

 //Start the server
 app.listen(port, ()=>{
   console.log((`The application started successfully on ${port}`));
 })


