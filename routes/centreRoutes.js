const express = require('express');
const {createCentre, findCentre, getAllCenters, getSingleCenter, getNearestLocations, updateCentre} = require('../controller/controller')
const upload = require('../helper/upload')

const router = express.Router();

router.post('/create-centre', createCentre);
router.get('/centres', findCentre);
router.get('/get-all-centres', getAllCenters);
router.get('/centers/:id', getSingleCenter);
router.get('/get-nearest-locations',getNearestLocations)
router.put('/update-centre/:id',upload.array('images', 5), updateCentre)

module.exports = router;