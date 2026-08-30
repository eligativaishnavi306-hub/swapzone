import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
    const {
        wishlist,
        removeFromWishlist
    } = useWishlist();

    return (
        <main className="wishlist-page">

            <div className="page-heading">
                <p>YOUR SAVED ITEMS</p>

                <h1>
                    Wishlist ❤️
                </h1>

                <span>
                    {wishlist.length} saved item
                    {wishlist.length !== 1 ? "s" : ""}
                </span>
            </div>


            {wishlist.length === 0 ? (

                <div className="empty wishlist-empty">

                    <Heart size={45} />

                    <h2>
                        Your wishlist is empty
                    </h2>

                    <p>
                        Save items you like and
                        find them here later.
                    </p>

                    <Link
                        to="/"
                        className="primary-btn"
                    >
                        Explore Listings
                    </Link>

                </div>

            ) : (

                <div className="wishlist-grid">

                    {wishlist.map((listing) => (

                        <div
                            className="wishlist-card"
                            key={listing._id}
                        >

                            <div className="listing-image">

                                {listing.images?.length > 0 ? (

                                    <img
                                        src={listing.images[0]}
                                        alt={listing.title}
                                    />

                                ) : (

                                    <span>📦</span>

                                )}

                            </div>


                            <div className="wishlist-info">

                                <span className="category">
                                    {listing.category}
                                </span>

                                <h3>
                                    {listing.title}
                                </h3>

                                <p>
                                    {listing.description}
                                </p>

                                <strong>
                                    ₹{listing.price}
                                </strong>

                                <div className="wishlist-actions">

                                    <Link
                                        to={`/listing/${listing._id}`}
                                        className="view-btn"
                                    >
                                        View
                                    </Link>

                                    <button
                                        onClick={() =>
                                            removeFromWishlist(
                                                listing._id
                                            )
                                        }
                                        className="remove-btn"
                                    >
                                        <Trash2 size={17} />
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </main>
    );
}

export default Wishlist;