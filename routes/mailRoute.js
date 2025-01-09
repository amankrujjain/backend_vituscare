const express = require('express');
const {appointmentMail} = require('../helper/mailer')

const router = express.Router();

router.post('/appointment-booking',appointmentMail)

module.exports = router;