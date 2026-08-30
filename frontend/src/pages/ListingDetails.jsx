import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";

import API from "../services/api";
import { useWishlist } from "../context/WishlistContext";

function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const {
        addToWishlist,
        removeFromWishlist,
        isWishlisted
    } = useWishlist();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await API.get(`/listings/${id}`);
                setListing(response.data);
            } catch (error) {
                console.error(error);
                setMessage("Listing not found");
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    const handleWishlist = () => {
        if (isWishlisted(listing._id)) {
            removeFromWishlist(listing._id);
        } else {
            addToWishlist(listing);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login first");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/listings/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate("/");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete listing"
            );
        }
    };

    if (loading) {
        return (
            <div className="empty">
                Loading listing...
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="empty">
                <h2>{message || "Listing not found"}</h2>

                <button onClick={() => navigate("/")}>
                    Back to Marketplace
                </button>
            </div>
        );
    }

    const saved = isWishlisted(listing._id);

    return (
        <main className="details-page">

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <div className="details-card">

                <div className="details-image">

                    {listing.images?.length > 0 ? (
                        <img
                            src={listing.images[0]}
                            alt={listing.title}
                        />
                    ) : (
                        <span>📦</span>
                    )}

                </div>

                <div className="details-info">

                    <span className="category">
                        {listing.category}
                    </span>

                    <h1>{listing.title}</h1>

                    <h2>₹{listing.price}</h2>

                    <p className="description">
                        {listing.description}
                    </p>

                    <div className="seller-info">
                        <strong>Campus</strong>
                        <span>{listing.campus}</span>
                    </div>

                    {listing.seller && (
                        <div className="seller-info">
                            <strong>Seller</strong>
                            <span>
                                {listing.seller.name}
                            </span>
                        </div>
                    )}

                    {message && (
                        <p className="message">
                            {message}
                        </p>
                    )}

                    <div className="details-actions">

                        <button
                            onClick={handleWishlist}
                            className="wishlist-btn"
                        >
                            <Heart
                                size={19}
                                fill={
                                    saved
                                        ? "currentColor"
                                        : "none"
                                }
                            />

                            {saved
                                ? "Saved"
                                : "Add to Wishlist"}
                        </button>

                        <button
                            onClick={() =>
                                navigate(`/listing/${id}/edit`)
                            }
                            className="edit-btn"
                        >
                            Edit Listing
                        </button>

                        <button
                            onClick={handleDelete}
                            className="delete-btn"
                        >
                            <Trash2 size={18} />
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default ListingDetails;