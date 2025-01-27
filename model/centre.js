const mongoose = require('mongoose');

const CentreSchema = new mongoose.Schema({
    name_of_centre: {
        type: String,
        required: true
    },
    address_of_centre: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: 9862898628
    },
    city: {
        type: String,
        required: true
    },
    pin_code: {
        type: Number
    },
    state: {
        type: String,
        required: true
    },
    map_location: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    is_active: {
        type: Boolean,
        default: true
    },
    pic: {
        type: [String],
        default: []
    },
    location: {
        type: String,
        default: ""
    },
    additional_details: {
        Timing_of_centre: {
            type: [
              {
                day: { type: String, required: true },
                time: { type: String, required: true }
              }
            ],
            default: [],
        },
        Ayushman: {
            type: String,
            default: ""
        },
        POFU: {
            type: String,
            default: ""
        },
        PORU: {
            type: String,
            default: ""
        },
        POSU: {
            type: String,
            default: ""
        },
        Nephrologist: {
            type: String,
            default: ""
        },
        ESI: {
            type: String,
            default: ""
        },
        TPA: {
            type: String,
            default: ""
        },
        CGHS: {
            type: String,
            default: ""
        },
        RGHS: {
            type: String,
            default: ""
        },
        Nephrologist_OPD: {
            type: String,
            default: ""
        },
        Nephrologist_OPD_Timings: {
            type: String,
            default: ""
        },
        Emergency_doctor: {
            type: String,
            default: ""
        },
        EPO: {
            type: String,
            default: ""
        },
        supplements: {
            type: String,
            default: ""
        },
        Hepatitis_c_plus_machine: {
            type: String,
            default: ""
        },
        NABH_level: {
            type: String,
            default: ""
        },
        multi_speciality_icu_facility: {
            type: String,
            default: ""
        }
    }
});

const Centre = mongoose.model("Centre", CentreSchema);

module.exports = Centre;
