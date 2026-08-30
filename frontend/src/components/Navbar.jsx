import { Link } from "react-router-dom";
import { Heart, PlusCircle, ShoppingBag } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";

function Navbar() {

    const { wishlist } = useWishlist();

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                <ShoppingBag size={25} />
                <span>SwapZone</span>
            </Link>

            <div className="nav-links">

                <Link to="/">
                    Marketplace
                </Link>

                <Link to="/wishlist">
                    <Heart size={18} />
                    Wishlist ({wishlist.length})
                </Link>

                <Link
                    to="/create"
                    className="sell-btn"
                >
                    <PlusCircle size={18} />
                    Sell Item
                </Link>

                <Link to="/login">
                    Login
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;