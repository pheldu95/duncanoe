const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/', (req, res, next) => {
    let name = req.body.name
    let email = req.body.email
    let message = req.body.message
    // var content = `${message} `
    console.log(message, 'this is the message');
    
    let mail = {
        from: name,
        to: `${email}`,  //Change to email address that you want to receive messages on
        subject: 'Packing List for BWCA Trip',
        text: 'packing list',
        html: `<html>${message}</html>`
        // html: '<p>helloasodcjadfjjdsfjisfdsjiafjisadfjoi</p>'
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
})

module.exports = router;