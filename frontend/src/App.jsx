import { BrowserRouter, Routes, Route } from "react-router-dom";

import { WishlistProvider } from "./context/WishlistContext";

import Navbar from "./components/Navbar";
import EditListing from "./pages/EditListing";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import Wishlist from "./pages/WishList";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <WishlistProvider>

                <Navbar />

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />

                    <Route
                        path="/create"
                        element={<CreateListing />}
                    />
                  <Route
                         path="/listing/:id/edit"
                         element={<EditListing />}
                  />
                    <Route
                        path="/listing/:id"
                        element={<ListingDetails />}
                    />

                    <Route
                        path="/wishlist"
                        element={<Wishlist />}
                    />

                </Routes>

            </WishlistProvider>
        </BrowserRouter>
    );
}

export default App;