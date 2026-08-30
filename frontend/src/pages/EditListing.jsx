import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditListing() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "Books",
        price: "",
        campus: ""
    });

    const [message, setMessage] = useState("");

    // Get existing listing
    useEffect(() => {

        const fetchListing = async () => {

            try {

                const response = await API.get(
                    `/listings/${id}`
                );

                const listing = response.data;

                setForm({
                    title: listing.title || "",
                    description: listing.description || "",
                    category: listing.category || "Books",
                    price: listing.price || "",
                    campus: listing.campus || ""
                });

            } catch (error) {

                console.log(error);
                setMessage("Unable to load listing");

            }
        };

        fetchListing();

    }, [id]);


    // Handle input changes
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    // Update listing
    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login first");
            return;
        }

        try {

            await API.put(
                `/listings/${id}`,
                {
                    ...form,
                    price: Number(form.price)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Listing updated successfully");

            setMessage("Listing updated successfully! ✅");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to update listing"
            );
        }
    };


    return (

        <main className="form-page">

            <form
                className="listing-form"
                onSubmit={handleSubmit}
            >

                <h1>Edit Listing</h1>

                <p>
                    Update your marketplace listing
                </p>

                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}


                <label>Item Title</label>

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />


                <label>Description</label>

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />


                <label>Category</label>

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                >

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


                <label>Price (₹)</label>

                <input
                    type="number"
                    name="price"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                />


                <label>Campus</label>

                <input
                    name="campus"
                    value={form.campus}
                    onChange={handleChange}
                    required
                />


                <button type="submit">
                    Save Changes
                </button>

            </form>

        </main>
    );
}

export default EditListing;