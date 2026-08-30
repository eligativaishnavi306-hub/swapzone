import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import API from "../services/api";
import ListingCard from "../components/ListingCard";

function Home() {

    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchListings = async () => {

        try {

            setLoading(true);

            const response = await API.get("/listings", {
                params: {
                    search,
                    category
                }
            });

            setListings(response.data.listings);

        } catch (error) {

            console.error(
                "Error fetching listings:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchListings();
    }, [search, category]);

    return (

        <main>

            <section className="hero">

                <div>

                    <p className="hero-small">
                        CAMPUS MARKETPLACE
                    </p>

                    <h1>
                        Buy. Sell. <span>Swap.</span>
                    </h1>

                    <p>
                        Discover great deals from students
                        around your campus.
                    </p>

                </div>

            </section>


            <section className="explore">

                <div className="search-box">

                    <Search size={20} />

                    <input
                        type="text"
                        placeholder="Search books, electronics..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    <option value="">
                        All Categories
                    </option>

                    <option value="Books">
                        Books
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Stationery">
                        Stationery
                    </option>

                    <option value="Furniture">
                        Furniture
                    </option>

                    <option value="Clothing">
                        Clothing
                    </option>

                    <option value="Other">
                        Other
                    </option>

                </select>

            </section>


            <section className="listings-section">

                <div className="section-heading">

                    <div>
                        <p>EXPLORE</p>
                        <h2>Campus Listings</h2>
                    </div>

                    <span>
                        {listings.length} items
                    </span>

                </div>


                {loading ? (

                    <div className="empty">
                        Loading listings...
                    </div>

                ) : listings.length === 0 ? (

                    <div className="empty">

                        <h3>
                            No listings found
                        </h3>

                        <p>
                            Be the first student to
                            post something!
                        </p>

                    </div>

                ) : (

                    <div className="listing-grid">

                        {listings.map((listing) => (

                           <ListingCard
                             key={listing._id}
                             listing={listing}
                             onDelete={(id) => {
                         setListings(
                        listings.filter((item) => item._id !== id)
                         );
                             }}
                      />

                        ))}

                    </div>

                )}

            </section>

        </main>

    );
}

export default Home;