// import React, { useState } from "react";
// import { Drinks } from "../data";
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { addToCart } from '../context/cartaddandremove';

// const App = () => {
//   const [activeTab, setActiveTab] = useState("Cocktails");
//   const [data, setData] = useState({});

//   const categoryNames = Object.keys(Drinks);

//   const handleAddToCart = (item) => {
//     // Adding item to the cart with proper structure
//     addToCart(item.id,item.image, item.name, item.price);
//     alert(`${item.name} has been added to the cart.`);
//   };

//   const handleBuyNow = (item) => {
//     // Set item details to data state
//     const selectedData = {
//       name: item.name,
//       image: item.image, // Replace with actual image field if available
//       description: item.ingredients,
//       price: item.price,
//     };
//     setData(selectedData);
//   };

//   const renderContent = () => {
//     return (
//       <div className="grid px-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <head>
//             <title>Pokaribs - Menu - Categories</title>
//           </head>
//         {Drinks[activeTab].map((item, index) => (
//           <div
//             key={item.id || index} // Use item.id if available, fallback to index
//             className="bg-white rounded-lg shadow-2xl p-4 text-center"
//           >
//             {/* Image Placeholder */}
//             <img
//               className="rounded-md w-full h-[200px] object-cover"
//               src={item.image || "placeholder.png"} // Replace with actual image field if available
//               alt={item.name}
//             />
//             <h3 className="text-xl font-semibold mb-2 pt-3">{item.name}</h3>
//             <p className="text-gray-600 overflow-y-scroll h-[65px]">
//               <b>Ingredients:</b> {item.ingredients}
//             </p>
//             <p className="text-lg font-bold text-yellow-600">₦{item.price}</p>
//             <div className="flex w-full h-fit px-3 py-2 justify-between gap-8 mobile:justify-center mobile:gap-8 items-center">
//               <button
//                 onClick={() => handleAddToCart(item)}
//                 className="bg-black flex items-center text-[13px] justify-center gap-2 text-white px-4 py-2 rounded hover:text-yellow-600 transition-colors"
//               >
//                 <FaShoppingCart className="mr-1" />
//                 Add to Cart
//               </button>
//               <button
//                 onClick={() => handleBuyNow(item)}
//                 className="bg-black flex items-center text-[13px] justify-center gap-2 text-white px-4 py-2 rounded hover:text-yellow-600 transition-colors"
//               >
//                 <Link to="/buy"  state={{ data: { name: item.name, image: item.image, description: item.ingredients, price: item.price } }}>
//                   Buy Now
//                 </Link>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="w-full h-fit py-8 items-center justify-center flex flex-col">
//       {/* Top Navigation */}
//       <div className="flex justify-center w-full items-center px-4 py-4">
//         <h1 className="text-2xl">Menu - Categories</h1>
//       </div>

//       {/* Categories Navigation */}
//       <div className="flex w-full overflow-x-scroll mobile:gap-5 h-fit justify-around py-7">
//         {categoryNames.map((category, index) => (
//           <div
//             key={index}
//             className="flex px-5 w-fit flex-row justify-around items-center pt-[20px] py-2"
//           >
//             <div
//               className={`w-[90px] text-center flex flex-col gap-2 ${
//                 activeTab === category
//                   ? "after:w-[100px] after:h-[3px] after:rounded-full after:bg-yellow-500"
//                   : "after:w-0"
//               } items-center cursor-pointer`}
//               onClick={() => setActiveTab(category)}
//             >
//               <div
//                 className={`w-6 h-6 ${
//                   activeTab === category ? "bg-blue-500" : "bg-gray-500"
//                 } rounded`}
//               ></div>
//               <span className="text-xs mt-1">{category}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow">{renderContent()}</div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addToCart } from '../context/cartaddandremove';
import { Drinks } from "../data"; // Import custom hook for fetching drinks data

const App = () => {
  const [activeTab, setActiveTab] = useState(""); // State for active category
  const [data, setData] = useState({}); // State to hold selected item data
  const { drinks, loading, error } = Drinks(); // Use custom hook for drinks data

  // Set document title
  useEffect(() => {
    document.title = "Pokaribs - Menu - Categories";
  }, []);

  // Update active tab when drinks data is loaded
  useEffect(() => {
    if (drinks.length > 0) {
      setActiveTab(drinks[0].id); // Set the first category as default active tab
    }
  }, [drinks]);

  // Handle adding to cart
  const handleAddToCart = (item) => {
    addToCart(item.id, item.image, item.name, item.price);
    alert(`${item.name} has been added to the cart.`);
  };

  // Handle "Buy Now" button click
  const handleBuyNow = (item) => {
    const selectedData = {
      name: item.name,
      image: item.image,
      description: item.ingredients,
      price: item.price,
    };
    setData(selectedData);
  };

  // Render content based on active tab
  const renderContent = () => {
    const activeCategory = drinks.find((category) => category.id === activeTab);

    if (!activeCategory) return <p>No items found.</p>;

    return (
      <div className="grid px-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {activeCategory.items.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white rounded-lg shadow-2xl p-4 text-center"
          >
            {/* Drink Image */}
            <img
              className="rounded-md w-full h-[200px] object-cover"
              src={item.image || "placeholder.png"}
              alt={item.name}
            />
            <h3 className="text-xl font-semibold mb-2 pt-3">{item.name}</h3>
            <p className="text-gray-600 overflow-y-scroll h-[65px]">
              <b>Ingredients:</b> {item.ingredients}
            </p>
            <p className="text-lg font-bold text-yellow-600">₦{item.price}</p>
            <div className="flex w-full h-fit px-3 py-2 justify-between gap-8 mobile:justify-center mobile:gap-8 items-center">
              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-black flex items-center text-[13px] justify-center gap-2 text-white px-4 py-2 rounded hover:text-yellow-600 transition-colors"
              >
                <FaShoppingCart className="mr-1" />
                Add to Cart
              </button>
              {/* Buy Now Button */}
              <Link
                to="/buy"
                state={{
                  data: {
                    name: item.name,
                    image: item.image,
                    description: item.ingredients,
                    price: item.price,
                  },
                }}
                className="bg-black flex items-center text-[13px] justify-center gap-2 text-white px-4 py-2 rounded hover:text-yellow-600 transition-colors"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-fit py-8 items-center justify-center flex flex-col">
      {/* Top Navigation */}
      <div className="flex justify-center w-full items-center px-4 py-4">
        <h1 className="text-2xl">Menu - Categories</h1>
      </div>

      {/* Categories Navigation */}
      <div className="flex w-full overflow-x-scroll mobile:gap-5 h-fit justify-around py-7">
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error loading drinks: {error.message}</p>
        ) : (
          drinks.map((category, index) => (
            <div
              key={index}
              className="flex px-5 w-fit flex-row justify-around items-center pt-[20px] py-2"
            >
              <div
                className={`w-[90px] text-center flex flex-col gap-2 ${
                  activeTab === category.id
                    ? "after:w-[100px] after:h-[3px] after:rounded-full after:bg-yellow-500"
                    : "after:w-0"
                } items-center cursor-pointer`}
                onClick={() => setActiveTab(category.id)}
              >
                <div
                  className={`w-6 h-6 ${
                    activeTab === category.id ? "bg-blue-500" : "bg-gray-500"
                  } rounded`}
                ></div>
                <span className="text-xs mt-1">{category.id}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {loading ? <p>Loading drinks...</p> : renderContent()}
      </div>
    </div>
  );
};

export default App;
