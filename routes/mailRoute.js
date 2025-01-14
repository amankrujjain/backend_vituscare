const express = require('express');
const {appointmentMail, greenField} = require('../helper/mailer')

const router = express.Router();

router.post('/appointment-booking',appointmentMail);
router.post('/green-field-enquiry',greenField)

module.exports = router;