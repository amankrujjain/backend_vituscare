const express = require('express');
const {createCentre, findCentre, getAllCenters, getSingleCenter} = require('../controller/controller')

const router = express.Router();

router.post('/create-centre', createCentre);
router.get('/centres', findCentre);
router.get('/get-all-centres', getAllCenters);
router.get('/centers/:id', getSingleCenter);

module.exports = router;