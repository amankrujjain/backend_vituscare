const Centre = require('../model/centre');
const haversine = require('../helper/haversine')
const Career = require('../model/Career')
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

const createCentre = async (req, res) => {
  try {
    const {
      name_of_centre,
      address_of_centre,
      phone,
      city,
      pin_code,
      state,
      map_location,
      longitude,
      latitude,
      created_at,
      is_active,
      additional_details, // Expecting additional details from the request body
    } = req.body;

    // Validate Timing_of_centre if it exists
    if (
      additional_details?.Timing_of_centre &&
      (!Array.isArray(additional_details.Timing_of_centre) ||
        !additional_details.Timing_of_centre.every(
          (item) => item.day && item.time
        ))
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Timing_of_centre must be an array of objects with 'day' and 'time' fields.",
      });
    }

    // Create a new Centre document with all provided details
    const centre = new Centre({
      name_of_centre,
      address_of_centre,
      phone,
      city,
      pin_code,
      state,
      map_location,
      longitude,
      latitude,
      create_at: created_at, // Mapping created_at correctly to the schema field
      is_active,
      additional_details, // Include additional_details object in the document
    });

    // Save the centre to the database
    await centre.save();

    return res.status(201).json({
      success: true,
      message: "Centre created successfully",
      centre: centre,
    });
  } catch (error) {
    console.error("Error occurred while creating a centre:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to process your request",
      error: error.message,
    });
  }
};


const getAllCenters = async (req, res) => {
  try {
    const centers = await Centre.find().sort({ state: 1 });
    if (!centers || centers.length === 0) {
      return res.status(404).json({ success: false, message: 'No centers found' });
    }

    return res.status(200).json({ success: true, centres: centers });
  } catch (error) {
    console.log("Error occured while fetching centers");
    return res.status(500).json({ success: false, message: "Error occured while fetching centers" })
  }
}

const findCentre = async (req, res) => {
  const { lat, lng, input, selectedPlaceId } = req.query;

  try {
    let userLocation = { lat: null, lng: null };

    // Step 1: Use geolocation if lat/lng are provided
    if (lat && lng) {
      userLocation.lat = parseFloat(lat);
      userLocation.lng = parseFloat(lng);
    } else if (selectedPlaceId) {
      // Use Place ID to fetch coordinates
      const placeDetailsResponse = await axios.get(
        `${process.env.GOOGLE_MAPS_BASE_URL}/place/details/json`,
        {
          params: { place_id: selectedPlaceId, key: process.env.MAP_API_KEY },
        }
      );

      if (placeDetailsResponse.data.status !== "OK") {
        return res.status(400).json({
          success: false,
          message: "Failed to fetch place details.",
          error: placeDetailsResponse.data.error_message || "Unknown error",
        });
      }

      const location = placeDetailsResponse.data.result.geometry.location;
      userLocation.lat = location.lat;
      userLocation.lng = location.lng;
    } else if (input) {
      // Fetch suggestions
      const placesResponse = await axios.get(
        `${process.env.GOOGLE_MAPS_BASE_URL}/place/autocomplete/json`,
        { params: { input, key: process.env.MAP_API_KEY } }
      );

      const suggestions = placesResponse.data.predictions;

      return res.status(200).json({
        success: true,
        suggestions,
      });
    }

    if (!userLocation.lat || !userLocation.lng) {
      return res.status(400).json({
        success: false,
        message: "Unable to determine location. Provide valid input or enable geolocation.",
      });
    }

    // Fetch nearby centers from the database
    const centers = await Centre.find({ is_active: true });
    if (!centers.length) {
      return res.status(200).json({
        success: true,
        message: "No centers available in the database.",
        centers: [],
      });
    }

    // Construct destinations string
    const destinations = centers.map(center => `${center.latitude},${center.longitude}`).join("|");
    console.log("Destinations String:", destinations);

    // Fetch distances using Google Distance Matrix API
    const distanceResponse = await axios.get(
      `${process.env.GOOGLE_MAPS_BASE_URL}/distancematrix/json`,
      {
        params: {
          origins: `${userLocation.lat},${userLocation.lng}`,
          destinations,
          mode: 'driving',
          key: process.env.MAP_API_KEY,
        },
      }
    );

    if (distanceResponse.data.status !== "OK") {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch distances.",
        error: distanceResponse.data.error_message || "Unknown error",
      });
    }

    const distances = distanceResponse.data.rows[0]?.elements || [];
    if (!distances.length) {
      return res.status(400).json({
        success: false,
        message: "No distance data found.",
      });
    }

    console.log("Distances Array:", distances);

    // Filter nearby centers with their original indices
    const nearbyCentersWithIndex = centers
      .map((center, index) => ({ center, index })) // Attach index to each center
      .filter(({ center, index }) => {
        const distanceData = distances[index];
        if (!distanceData || distanceData.status !== "OK") {
          console.log(`Skipping center ${center.name_of_centre}: Invalid distance data.`);
          return false;
        }
        const distanceInMeters = distanceData.distance.value;
        console.log(
          `Filtering Center: ${center.name_of_centre}, Distance = ${distanceInMeters / 1000} km`
        );
        return distanceInMeters <= 50000; // 50 km in meters
      });

    console.log("Filtered Nearby Centers with Indices:", nearbyCentersWithIndex);

    if (!nearbyCentersWithIndex.length) {
      return res.status(200).json({
        success: true,
        message: "No centers found within 50km.",
        userLocation,
        centers: [],
      });
    }

    // Map results while preserving correct distance data
    const results = nearbyCentersWithIndex.map(({ center, index }) => {
      const distanceData = distances[index]; // Use the original index for distance
      console.log(
        `Mapping Result for Center: ${center.name_of_centre}, Distance = ${
          distanceData?.distance?.text || "N/A"
        }`
      );
      return {
        _id: center._id,
        name_of_centre: center.name_of_centre,
        address_of_centre: center.address_of_centre,
        phone: center.phone,
        state: center.state,
        city: center.city,
        pin_code: center.pin_code,
        map_location: center.map_location,
        distance: distanceData?.distance?.text || "Distance not available",
      };
    });
        console.log("Final Results:", results);

    res.status(200).json({
      success: true,
      userLocation,
      centers: results,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};



const getSingleCenter = async (req, res) => {
  const { id } = req.params;

  try {

    const center = await Centre.findById(id);

    if (!center) {
      return res.status(404).json({
        success: false,
        message: 'Center not found',
      });
    }

    return res.status(200).json({
      success: true,
      center: center,
    });
  } catch (error) {
    console.error('Error fetching center:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};


const createJob = async (req, res) => {
  try {
    // validation check

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: errors.array()
      })
    };

    const { job_title, job_location, job_type, job_experience, job_created_on, job_description, is_active } = req.body;

    const existingJobPost = await Career.findOne({ job_title });
    if (existingJobPost) {
      return res.status(409).json({
        success: false,
        message: "Job already posted!"
      })
    };

    const newJobPost = new Career({
      job_title, 
      job_location, 
      job_type, 
      job_experience, 
      job_created_on, 
      job_description, 
      is_active
    });

    await newJobPost.save();
    
    return res.status(201).json({
      success: true,
      message: "Job post created successfully",
      data: newJobPost
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Internal server error"
    })
  }
};

const getAllJobs = async(req,res)=>{
  try {
    const jobPost = await Career.find({is_active: true}).sort({job_created_on: 1});
    if(!jobPost){
      return res.status(400).json({
        success: false,
        message:"No Job Available"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Available jobs",
      data: jobPost
    })
  } catch (error) {
    console.log("Error while fetching the job post",error);
    return res.status(500).json({
      success: false,
      message:"Error occured while fetching jobs"
    })
  }
};

const getSingleJob = async (req, res) => {
  try {
    const { id, job_title, job_location } = req.params;

    // Validate object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // Find job by ID, title, and location
    const jobPost = await Career.findOne({
      _id: id,
      job_title: decodeURIComponent(job_title),
      job_location: decodeURIComponent(job_location),
    });

    if (!jobPost) {
      return res.status(404).json({
        success: false,
        message: "No related jobs were found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${job_title} Job found available`,
      data: jobPost,
    });
  } catch (error) {
    console.error("Error occurred while fetching single job post", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching job post",
    });
  }
};
const activateJobPost = async (req, res) => {
  try {
    const { id } = req.params;

    const jobPost = await Career.findById(id);
    if (!jobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    if(jobPost.is_active === true){
      return res.status(409).json({
        success: false,
        message: `Job post is already active`,
      });
    }
    
      jobPost.is_active = true;
      await jobPost.save();
      return res.status(200).json({
        success: true,
        message: `Job post successfully activated`,
        data: jobPost,
      });
   
  } catch (error) {
    console.error("Error while activating/deactivating the job post", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating job activation status",
    });
  }
};


const updateJobPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove is_active from updateData to ensure it's handled only in activateJobPost
    delete updateData.is_active;

    // Validate and update the job post
    const updatedJob = await Career.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied
    });

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job post updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Error while updating the job post", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the job post",
    });
  }
};

const deleteJobPost = async(req,res)=>{
  try {
    const {id} = req.params;

    const jobPost = await Career.findById(id);

    if(!jobPost){
      return res.status(404).json({
        success: false,
        messsage:"No related jobs were found !"
      })
    };

    if(jobPost.is_active === false){
      return res.status(409).json({
        success: false,
        message: "job is already inactive"
      })
    };

    const updatedJob = await Career.findByIdAndUpdate(id,{is_active: false}, {new: true});

    return res.status(200).json({
      success: true,
      message: 'Job is deactivated successfully',
      data: updatedJob
    })
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({
      success: false,
      message:"Internal server error"
    })
  }
}

module.exports = {
  createCentre,
  findCentre,
  getSingleCenter,
  getAllCenters,
  createJob,
  getAllJobs,
  getSingleJob,
  updateJobPost,
  deleteJobPost,
  activateJobPost
}