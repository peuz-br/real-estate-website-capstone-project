import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../services/authContext';
import './PropertyDetailsPage.css';

const PropertyDetailsPage = () => {
    const { id } = useParams();  
    const { user } = useContext(AuthContext);  
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [loading, setLoading] = useState(true); 

    console.log("PropertyDetailsPage mounted with id:", id);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/properties/${id}`);
                setPropertyDetails(response.data);
                console.log("Property Details:", response.data); 
            } catch (error) {
                console.error("Error fetching property details:", error);
            } finally {
                setLoading(false); 
            }
        };

        if (id) {
            fetchPropertyDetails();
        }
    }, [id]);

    // Send Inquiry
    const handleSendInquiry = async () => {
        if (!user) {
            alert("You must be logged in to send an inquiry.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/inquiries`,
                { property_id: id, user_id: user.user_id, message: "Hello, I am interested in this property!" },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert("Inquiry sent successfully!");
        } catch (error) {
            console.error("Error sending inquiry:", error);
        }
    };

    // Add to Favorites
    const handleAddToFavorites = async () => {
        if (!user) {
            alert("You must be logged in to add to favorites.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/favorites`,
                { property_id: id, user_id: user.user_id },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert("Property added to favorites!");
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    if (loading) return <div className="property-details-page">Loading...</div>; 
    if (!propertyDetails) return <div className="property-details-page">Property not found</div>; 

    return (
        <div className="property-details-page">
            <div className="property-content">
                <h1 className="property-title">{propertyDetails.title}</h1>
                <p className="property-description">{propertyDetails.description}</p>
                <img
                    src={
                        propertyDetails.images && propertyDetails.images !== 'null'
                            ? `http://localhost:5000/${JSON.parse(propertyDetails.images)[0].replace(/\\/g, '/')}`
                            : 'default-placeholder.jpg'
                    }
                    alt={propertyDetails.title}
                    className="property-image"
                />
                <div className="property-info">
                    <p>Price: ${propertyDetails.price}</p>
                    <p>Location: {propertyDetails.location}</p>
                    <p>Bedrooms: {propertyDetails.bedrooms}</p>
                    <p>Bathrooms: {propertyDetails.bathrooms}</p>
                    <p>Size: {propertyDetails.size} sqft</p>
                </div>
                <div className="button-container">
                    <button onClick={handleSendInquiry}>Send Inquiry</button>
                    <button onClick={handleAddToFavorites}>Add to Favorites</button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
