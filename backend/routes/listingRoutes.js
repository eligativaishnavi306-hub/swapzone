const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
} = require("../controllers/listingControllers");


// GET ALL
router.get("/", getListings);

// GET ONE
router.get("/:id", getListing);

// CREATE
router.post("/", protect, createListing);

// UPDATE
router.put("/:id", protect, updateListing);

// DELETE
router.delete("/:id", protect, deleteListing);


module.exports = router;