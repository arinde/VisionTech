import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { db } from '../services/firebase'; // Uncomment when Firebase is ready
// import { doc, getDoc } from 'firebase/firestore';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product from Firestore
    // const fetchProduct = async () => {
    //   const docRef = doc(db, 'products', id);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     setProduct({ id, ...docSnap.data() });
    //   }
    // };
    // fetchProduct();

    // Temp dummy product
    setProduct({
      name: 'Smartphone X100',
      price: 500,
      description: 'Flagship phone with awesome camera and display.',
      imageUrl: '/images/sample-phone.jpg'
    });
  }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-gray-700 mt-2">${product.price}</p>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Add to Cart</button>
    </div>
  );
};

export default ProductDetails;