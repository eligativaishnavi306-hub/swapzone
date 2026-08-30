const Listing = require("../models/Listing");

// CREATE LISTING
const createListing = async (req, res) => {
    try {
        const listing = await Listing.create({
            ...req.body,
            seller: req.user.id
        });

        res.status(201).json(listing);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET ALL LISTINGS
const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find()
            .populate("seller", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: listings.length,
            listings
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET ONE LISTING
const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate("seller", "name email");

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        res.status(200).json(listing);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE LISTING
const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        res.status(200).json(listing);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE LISTING
const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(
            req.params.id
        );

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        res.status(200).json({
            message: "Listing deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing
};