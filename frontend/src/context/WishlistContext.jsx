import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (listing) => {
        setWishlist([...wishlist, listing]);
    };

    const removeFromWishlist = (id) => {
        setWishlist(
            wishlist.filter((item) => item._id !== id)
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}