import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateListing() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Books");
    const [price, setPrice] = useState("");
    const [campus, setCampus] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("FORM SUBMITTED");

        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login first");
            return;
        }

        try {

            console.log("Submitting book...");

            const response = await API.post(
                "/listings",
                {
                    title: title,
                    description: description,
                    category: category,
                    price: Number(price),
                    campus: campus,
                    images: image
                        ? [URL.createObjectURL(image)]
                        : []
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Book added:", response.data);

            setMessage("Book added successfully!");

            setTitle("");
            setDescription("");
            setPrice("");
            setCampus("");
            setImage(null);

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            console.log("Error:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to add book"
            );
        }
    };

    return (

        <div className="form-page">

            <form
                className="listing-form"
                onSubmit={handleSubmit}
            >

                <h1>Create Listing</h1>

                <p>
                    Sell or donate an item to another student.
                </p>

                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}

                <label>Title</label>

                <input
                    type="text"
                    placeholder="Enter item name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />


                <label>Description</label>

                <textarea
                    placeholder="Enter item description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    required
                />


                <label>Category</label>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
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


                <label>Price</label>

                <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                    required
                />


                <label>Campus</label>

                <input
                    type="text"
                    placeholder="Enter campus"
                    value={campus}
                    onChange={(e) =>
                        setCampus(e.target.value)
                    }
                    required
                />


                <label>Image</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                />


                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            marginTop: "10px"
                        }}
                    />
                )}


                <button type="submit">
                    Create Listing
                </button>

            </form>

        </div>
    );
}

export default CreateListing;