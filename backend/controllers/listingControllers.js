const Listing = require("../models/Listing");

// CREATE LISTING
const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      images,
      campus
    } = req.body;

    if (!title || !description || !category || price === undefined || !campus) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    const listing = await Listing.create({
      title,
      description,
      category,
      price,
      images: images || [],
      campus,
      seller: req.user.id
    });

    res.status(201).json({
      message: "Listing created successfully",
      listing
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET ALL LISTINGS
const getListings = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      sort
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$text = {
        $search: search
      };
    }

    let query = Listing.find(filter)
      .populate("seller", "name email campus");

    if (sort === "price_asc") {
      query = query.sort({ price: 1 });
    }

    if (sort === "price_desc") {
      query = query.sort({ price: -1 });
    }

    if (sort === "newest") {
      query = query.sort({ createdAt: -1 });
    }

    const listings = await query;

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


// GET SINGLE LISTING
const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("seller", "name email campus");

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    res.status(200).json(listing);

  } catch (error) {
    res.status(500).json({
      message: "Invalid listing ID"
    });
  }
};


// UPDATE LISTING
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    // Only seller can update
    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only update your own listing"
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: "Listing updated successfully",
      listing: updatedListing
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE LISTING
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    // Only seller can delete
    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own listing"
      });
    }

    await listing.deleteOne();

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
  getListings,
  getListing,
  updateListing,
  deleteListing
};