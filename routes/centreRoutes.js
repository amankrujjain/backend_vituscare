const express = require('express');
const {createCentre, findCentre, getAllCenters, getSingleCenter, getNearestLocations} = require('../controller/controller')

const router = express.Router();

router.post('/create-centre', createCentre);
router.get('/centres', findCentre);
router.get('/get-all-centres', getAllCenters);
router.get('/centers/:id', getSingleCenter);
router.get('/get-nearest-locations',getNearestLocations)

module.exports = router;