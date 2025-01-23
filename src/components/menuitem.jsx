import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../context/cartaddandremove'; // Ensure this is the correct import
import { Link } from 'react-router-dom';

const MenuItem = ({ id, name, price, image, description }) => {
    // Data object to be passed to the Buy Now page
    let data = { id, name, image, description, price };

    const handleAddToCart = () => {
        console.log("Adding to cart:", { id, name, price });
        addToCart(id, image, name, price); // Add the item to the cart
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-4 text-center w-[300px] mx-auto">
            {/* Drink Image */}
            <img className="rounded-md w-full h-[200px] object-cover" src={image} alt={name} />
            
            {/* Drink Name */}
            <h3 className="text-xl font-semibold mb-2 pt-3">{name}</h3>
            
            {/* Description */}
            <p className="text-gray-600 overflow-y-scroll h-[85px] mb-2">
                <b>Description:</b> {description}
            </p>

            {/* Price */}
            <p className="text-lg font-bold text-yellow-600 mb-4">₦{price}</p>

            {/* Buttons */}
            <div className="flex w-full h-fit px-3 py-2 justify-between items-center">
                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="bg-black flex items-center text-[13px] justify-center gap-2 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    <FaShoppingCart className="mr-1" />
                    Add to Cart
                </button>

                {/* Buy Now Button */}
                <button
                    className="bg-black flex items-center text-[13px] justify-center gap-2 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    <Link to='/buy' state={{ data }}>
                        Buy Now
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default MenuItem;
