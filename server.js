require('dotenv').config();
const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

const app = express();
const HTTP_PORT = 3333;

const {SG_API_KEY,FROM_EMAIL,TO_EMAIL} = process.env
sgMail.setApiKey(SG_API_KEY);
app.get('/', (req,res) =>{
    res.status(200).json({"message":"OK"});
})
app.post('/register', bodyParser.json(), async (req,res)=>{

    const msg = {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: 'Testing Node email Service',
        text: 'This is awesome email sent from node app'
    }
    await sgMail.send(msg)
    res.json({success:true})
})

app.listen(HTTP_PORT, ()=>{
    console.log(`Code is running on port ${HTTP_PORT}`)
})
