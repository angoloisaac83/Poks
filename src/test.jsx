import React from 'react';
import { Drinks } from './data';

const Test = () => {
  const { drinks, loading, error } = Drinks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching drinks: {error.message}</div>;
  }

  return (
    <ul>
      {JSON.stringify(drinks)}
    </ul>
  );
};

export default Test;

// import React, { useState, useEffect } from 'react';
// import MenuItem from './components/menuitem';
// import { Link } from 'react-router-dom';
// import { CartProvider } from './context/cartcontext';
// import { Drinks } from "./data"; // Assuming Drinks is the data you provided

// const Test = () => {
//     const { drinks, loading, error } = Drinks(); // Assume Drinks is a hook fetching data
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [meals, setMeals] = useState([]);

//     useEffect(() => {
//         if (drinks.length > 0) {
//             setCategories(drinks); // Set categories from drinks data
//             setSelectedCategory(drinks[0]); // Default to the first category
//         }
//     }, [drinks]);

//     useEffect(() => {
//         if (selectedCategory) {
//             setMeals(selectedCategory.items); // Set meals based on the selected category
//         }
//     }, [selectedCategory]);

//     return (
//         <CartProvider>
//             <head>
//                 <title>Pokaribs-Home</title>
//             </head>
            
//             <header className='w-full h-screen relative flex items-center justify-center text-white'>
//                 <video
//                     autoPlay
//                     loop
//                     muted
//                     className='absolute top-0 left-0 w-full h-screen min-h-full object-cover z-[-1]'
//                 >
//                     <source src={"../../public/IMG_9271.MP4"} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>

//                 <div className='w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.34)] h-full gap-7 text-center'>
//                     <h1 className='text-[45px] mobile:text-[35px] font-bold mobile:px-3'>
//                         Pokaribs Native Kitchen & Lounge
//                     </h1>
//                     <p className='w-[45%] mobile:w-[95%] mobile:text-[18px] pb-[20px] text-xl font-medium'>
//                         Pokaribs Native Kitchen & Lounge is a culinary gem that invites tourists to indulge in the rich flavors of Nigeria.
//                     </p>
//                     <button className='bg-black text-white hover:text-yellow-500 px-[15px] py-[7px] text-[19px] rounded-md'>
//                         <Link to="/menu" className="no-underline text-white hover:text-yellow-500">
//                             Start Ordering
//                         </Link>
//                     </button>
//                 </div>
//             </header>

//             {/* Menu Section */}
//             <div className="container mx-auto w-full h-fit p-6">
//                 <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
//                 <div className="flex justify-center mb-4">
//                     {categories.map((category) => (
//                         <button
//                             key={category.id}
//                             className={`px-4 py-2 m-2 ${selectedCategory === category ? 'bg-yellow-500' : 'bg-gray-300'}`}
//                             onClick={() => setSelectedCategory(category)}
//                         >
//                             {category.id}
//                         </button>
//                     ))}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                     {loading ? (
//                         <p>Loading categories...</p>
//                     ) : (
//                         meals.length > 0 ? (
//                             meals.map((item, index) => (
//                                 <MenuItem
//                                     key={index} // Using index as key for items
//                                     name={item.name}
//                                     price={item.price}
//                                     image={item.image}
//                                     description={item.ingredients} // Assuming ingredients as description
//                                 />
//                             ))
//                         ) : (
//                             <p>No items available in this category.</p>
//                         )
//                     )}
//                 </div>
//             </div>
//         </CartProvider>
//     );
// };

// export default Test;