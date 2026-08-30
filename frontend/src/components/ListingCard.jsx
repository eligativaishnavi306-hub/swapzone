import { Link } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";
import API from "../services/api";

function ListingCard({ listing, onDelete }) {

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Do you want to delete this listing?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/listings/${listing._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Listing deleted");

            onDelete(listing._id);

        } catch (error) {

            console.log(error);
            alert("Failed to delete listing");

        }
    };

    return (
        <div className="listing-card">

            <div className="listing-image">

                {listing.images && listing.images.length > 0 ? (
                    <img
                        src={listing.images[0]}
                        alt={listing.title}
                    />
                ) : (
                    <span>📦</span>
                )}

            </div>

            <div className="listing-info">

                <span className="category">
                    {listing.category}
                </span>

                <Link
                    to={`/listing/${listing._id}/edit`}
                    className="listing-title"
                >
                    {listing.title}
                </Link>

                <p>
                    {listing.description}
                </p>

                <div className="card-bottom">

                    <strong>
                        ₹{listing.price}
                    </strong>

                    <div>

                        <Link
                            to={`/listing/${listing._id}/edit`}
                            className="edit-btn"
                        >
                            <Edit size={16} />
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="delete-btn"
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ListingCard;